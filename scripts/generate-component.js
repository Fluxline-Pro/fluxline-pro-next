#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get component name from command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Please provide a component name');
  console.log('Usage: yarn generate:component ComponentName');
  process.exit(1);
}

// Validate component name (should be PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Error: Component name should be in PascalCase (e.g., MyComponent)');
  process.exit(1);
}

// Convert to different cases
const kebabCase = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const camelCase = componentName.charAt(0).toLowerCase() + componentName.slice(1);

// Define paths
const componentsDir = path.join(process.cwd(), 'src', 'theme', 'components');
const componentDir = path.join(componentsDir, kebabCase);

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Templates
const templates = {
  tsx: `'use client';

import React from 'react';
import { mergeStyleSets, ITheme } from '@fluentui/react';
import styles from './${kebabCase}.module.scss';

export interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
  theme?: ITheme;
}

/**
 * ${componentName} component
 * 
 * @param props - Component props
 * @returns ${componentName} component
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  className,
  children,
  theme,
  ...props
}) => {
  const classNames = mergeStyleSets({
    root: [
      styles.${camelCase},
      className,
    ],
  });

  return (
    <div className={classNames.root} {...props}>
      {children}
    </div>
  );
};

${componentName}.displayName = '${componentName}';

export default ${componentName};
`,

  scss: `@import '../../theme';

.${camelCase} {
  // Component styles here
  display: block;
  
  // Use theme variables
  // color: var(--theme-palette-neutralPrimary);
  // background-color: var(--theme-palette-neutralLighter);
  
  // Add responsive breakpoints
  @media (max-width: 768px) {
    // Mobile styles
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    // Tablet styles
  }
  
  @media (min-width: 1025px) {
    // Desktop styles
  }
}
`,

  test: `import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ${componentName} } from './${kebabCase}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
  });

  it('renders children correctly', () => {
    const testText = 'Test content';
    render(<${componentName}>{testText}</${componentName}>);
    
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<${componentName} className={customClass}>Test</${componentName}>);
    
    const element = screen.getByText('Test');
    expect(element).toHaveClass(customClass);
  });

  it('passes through additional props', () => {
    const testId = 'test-${kebabCase}';
    render(<${componentName} data-testid={testId}>Test</${componentName}>);
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // Add more specific tests for your component's functionality
  it('handles user interactions', async () => {
    const user = userEvent.setup();
    render(<${componentName}>Interactive content</${componentName}>);
    
    // Add interaction tests here
    // Example: await user.click(screen.getByRole('button'));
  });
});
`,

  stories: `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${kebabCase}';

const meta = {
  title: 'Theme/Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${componentName} component with Fluent UI theming support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
    children: {
      control: 'text',
      description: 'Content to render inside the component',
    },
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${componentName}',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Styled ${componentName}',
    className: 'custom-styling',
  },
};

export const Empty: Story = {
  args: {},
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <div>
        <h3>Complex Content</h3>
        <p>This ${componentName} contains multiple elements.</p>
        <button>Interactive Element</button>
      </div>
    ),
  },
};

// Add more stories as needed for different states/variations
export const Loading: Story = {
  args: {
    children: 'Loading...',
    // Add loading-specific props if your component supports them
  },
};

export const Error: Story = {
  args: {
    children: 'Error state',
    // Add error-specific props if your component supports them
  },
};
`,

  barrel: `export { ${componentName} } from './${kebabCase}';
export type { ${componentName}Props } from './${kebabCase}';
`
};

try {
  // Ensure directories exist
  ensureDirectoryExists(componentsDir);
  ensureDirectoryExists(componentDir);

  // Create files
  const files = [
    { path: path.join(componentDir, `${kebabCase}.tsx`), content: templates.tsx },
    { path: path.join(componentDir, `${kebabCase}.module.scss`), content: templates.scss },
    { path: path.join(componentDir, `${kebabCase}.test.tsx`), content: templates.test },
    { path: path.join(componentDir, `${kebabCase}.stories.tsx`), content: templates.stories },
    { path: path.join(componentDir, 'index.ts'), content: templates.barrel },
  ];

  files.forEach(({ path: filePath, content }) => {
    if (fs.existsSync(filePath)) {
      console.warn(`⚠️  File already exists: ${path.relative(process.cwd(), filePath)}`);
    } else {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Created: ${path.relative(process.cwd(), filePath)}`);
    }
  });

  // Update main components index file
  const mainIndexPath = path.join(componentsDir, 'index.ts');
  const exportLine = `export * from './${kebabCase}';`;
  
  if (fs.existsSync(mainIndexPath)) {
    const content = fs.readFileSync(mainIndexPath, 'utf8');
    if (!content.includes(exportLine)) {
      fs.appendFileSync(mainIndexPath, `\n${exportLine}`);
      console.log(`✅ Updated: ${path.relative(process.cwd(), mainIndexPath)}`);
    }
  } else {
    fs.writeFileSync(mainIndexPath, `${exportLine}\n`);
    console.log(`✅ Created: ${path.relative(process.cwd(), mainIndexPath)}`);
  }

  console.log(`\n🎉 Successfully generated ${componentName} component!`);
  console.log(`\n📁 Files created in: src/theme/components/${kebabCase}/`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Run 'yarn scss-types' to generate SCSS type definitions`);
  console.log(`   2. Import and use: import { ${componentName} } from '@/theme/components'`);
  console.log(`   3. Run tests: yarn test ${kebabCase}`);
  console.log(`   4. View stories: yarn storybook (when configured)`);

} catch (error) {
  console.error('❌ Error generating component:', error.message);
  process.exit(1);
}