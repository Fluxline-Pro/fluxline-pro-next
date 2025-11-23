/**
 * Blog Posts Mock Data
 * Mock data for blog content with markdown support
 * Structure mirrors press-release and case-studies patterns
 */

import { BlogPost } from './types';

/**
 * Mock blog posts data in reverse chronological order (newest first)
 */
export const blogPostsMockData: BlogPost[] = [
  {
    id: 'embracing-next-js-16-modern-web-development',
    slug: 'embracing-next-js-16-modern-web-development',
    title: 'Embracing Next.js 16 for Modern Web Development',
    excerpt:
      'Exploring the powerful features of Next.js 16 and how it transforms the way we build web applications with enhanced performance and developer experience.',
    content: `
# Embracing Next.js 16 for Modern Web Development

Next.js 16 represents a significant leap forward in web development, bringing enhanced performance, improved developer experience, and powerful new features that make building modern web applications more efficient than ever.

## The Power of App Router

The App Router in Next.js 16 revolutionizes how we structure our applications. With file-based routing, nested layouts, and the ability to use Server Components by default, we can create more efficient and maintainable applications.

### Key Benefits

- **Server Components**: Improved performance with reduced JavaScript bundle sizes
- **Streaming**: Progressive rendering for better user experience
- **Simplified Data Fetching**: Native fetch API integration with caching
- **Enhanced SEO**: Built-in metadata API for better search engine optimization

## Performance Improvements

Next.js 16 includes significant performance enhancements that benefit both developers and end users:

\`\`\`typescript
// Example: Server Component with data fetching
export default async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts');
  return <PostList posts={posts} />;
}
\`\`\`

## Developer Experience

The developer experience has been greatly improved with features like:

- Faster builds with Turbopack
- Improved error messages
- Better TypeScript support
- Enhanced debugging tools

## Conclusion

Next.js 16 is not just an incremental update—it's a transformation in how we approach web development. By embracing these new features, we can build faster, more efficient, and more maintainable applications.
`,
    author: 'Fluxline Resonance Group',
    publishedDate: new Date('2025-01-25'),
    imageUrl: undefined,
    imageAlt: 'Next.js 16 Modern Web Development',
    tags: ['Next.js', 'Web Development', 'Technology', 'Performance'],
    category: 'Technology',
    featured: true,
    seoMetadata: {
      title: 'Embracing Next.js 16 for Modern Web Development | Fluxline Pro',
      description:
        'Explore the powerful features of Next.js 16 and how it transforms modern web application development with enhanced performance and developer experience.',
      keywords: [
        'Next.js 16',
        'web development',
        'React',
        'Server Components',
        'App Router',
        'performance',
      ],
    },
  },
  {
    id: 'building-accessible-web-applications',
    slug: 'building-accessible-web-applications',
    title: 'Building Accessible Web Applications: A Guide to WCAG 2.1',
    excerpt:
      'Learn essential principles and practical techniques for creating web applications that are accessible to all users, following WCAG 2.1 AA standards.',
    content: `
# Building Accessible Web Applications: A Guide to WCAG 2.1

Accessibility is not just a feature—it's a fundamental requirement for modern web applications. This guide explores the principles and practices necessary to create inclusive digital experiences.

## Understanding WCAG 2.1

The Web Content Accessibility Guidelines (WCAG) 2.1 provide a comprehensive framework for making web content more accessible. The guidelines are organized around four principles:

### 1. Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

- Provide text alternatives for images
- Create content that can be presented in different ways
- Make it easier for users to see and hear content

### 2. Operable

User interface components and navigation must be operable.

- Make all functionality available from a keyboard
- Give users enough time to read and use content
- Don't design content in a way that is known to cause seizures
- Provide ways to help users navigate and find content

### 3. Understandable

Information and the operation of the user interface must be understandable.

- Make text content readable and understandable
- Make web pages appear and operate in predictable ways
- Help users avoid and correct mistakes

### 4. Robust

Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

## Practical Implementation

\`\`\`tsx
// Example: Accessible button with ARIA labels
<button
  aria-label="Close dialog"
  onClick={handleClose}
  className="focus:ring-2 focus:ring-blue-500"
>
  <CloseIcon aria-hidden="true" />
</button>
\`\`\`

## Key Considerations

- **Color Contrast**: Ensure text has sufficient contrast against backgrounds
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Readers**: Provide proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators for keyboard users
- **Responsive Design**: Ensure accessibility across all devices

## Testing Strategies

1. Use automated tools like axe or Lighthouse
2. Test with actual screen readers
3. Navigate using only the keyboard
4. Verify with users who have disabilities

## Conclusion

Building accessible applications benefits everyone. By following WCAG 2.1 guidelines and implementing accessibility from the start, we create better experiences for all users.
`,
    author: 'Fluxline Resonance Group',
    publishedDate: new Date('2025-01-20'),
    imageUrl: undefined,
    imageAlt: 'Accessible Web Applications Guide',
    tags: ['Accessibility', 'WCAG', 'Web Development', 'UX Design'],
    category: 'Development',
    featured: true,
    seoMetadata: {
      title:
        'Building Accessible Web Applications: WCAG 2.1 Guide | Fluxline Pro',
      description:
        'Essential principles and practical techniques for creating accessible web applications that follow WCAG 2.1 AA standards.',
      keywords: [
        'accessibility',
        'WCAG 2.1',
        'web development',
        'inclusive design',
        'a11y',
      ],
    },
  },
  {
    id: 'digital-transformation-strategies-2025',
    slug: 'digital-transformation-strategies-2025',
    title: 'Digital Transformation Strategies for 2025',
    excerpt:
      'Discover key strategies and best practices for successful digital transformation initiatives in modern businesses.',
    content: `
# Digital Transformation Strategies for 2025

Digital transformation is no longer optional—it's a necessity for businesses that want to remain competitive in today's rapidly evolving marketplace. This article explores effective strategies for successful digital transformation.

## Understanding Digital Transformation

Digital transformation goes beyond simply adopting new technologies. It's about fundamentally changing how your business operates and delivers value to customers.

### Key Components

1. **Technology Infrastructure**: Cloud-native architecture and microservices
2. **Data Strategy**: Analytics and insights-driven decision making
3. **Customer Experience**: Digital-first engagement models
4. **Organizational Culture**: Agile mindset and continuous learning

## Strategic Framework

### Phase 1: Assessment and Planning

- Evaluate current technology landscape
- Identify pain points and opportunities
- Define clear objectives and KPIs
- Create a phased roadmap

### Phase 2: Foundation Building

- Migrate to cloud infrastructure
- Implement DevOps practices
- Establish data governance
- Train teams on new technologies

### Phase 3: Digital Capabilities

- Build customer-facing digital products
- Implement automation and AI
- Create data-driven processes
- Enable real-time decision making

### Phase 4: Optimization and Scale

- Continuous improvement cycles
- Expand digital capabilities
- Measure and optimize performance
- Scale successful initiatives

## Technology Considerations

\`\`\`typescript
// Modern Architecture Pattern
interface DigitalTransformationStack {
  frontend: 'Next.js' | 'React';
  backend: 'Node.js' | 'Azure Functions';
  database: 'PostgreSQL' | 'CosmosDB';
  infrastructure: 'Azure' | 'AWS';
  ci_cd: 'GitHub Actions' | 'Azure DevOps';
}
\`\`\`

## Common Challenges

- **Resistance to Change**: Address through clear communication and training
- **Legacy Systems**: Plan incremental migration strategies
- **Skills Gap**: Invest in upskilling and hiring
- **Budget Constraints**: Start with high-impact, low-cost initiatives

## Best Practices

1. Start with business outcomes, not technology
2. Adopt an agile, iterative approach
3. Prioritize user experience
4. Measure everything
5. Foster a culture of innovation

## Conclusion

Successful digital transformation requires a holistic approach that combines technology, people, and processes. By following these strategies and best practices, organizations can navigate the complexities of digital transformation and emerge stronger and more competitive.
`,
    author: 'Fluxline Resonance Group',
    publishedDate: new Date('2025-01-15'),
    imageUrl: undefined,
    imageAlt: 'Digital Transformation Strategies',
    tags: [
      'Digital Transformation',
      'Business Strategy',
      'Technology',
      'Innovation',
    ],
    category: 'Growth',
    featured: false,
    seoMetadata: {
      title: 'Digital Transformation Strategies for 2025 | Fluxline Pro',
      description:
        'Key strategies and best practices for successful digital transformation initiatives in modern businesses.',
      keywords: [
        'digital transformation',
        'business strategy',
        'cloud migration',
        'innovation',
        'modernization',
      ],
    },
  },
  {
    id: 'design-systems-scalable-applications',
    slug: 'design-systems-scalable-applications',
    title: 'Design Systems for Scalable Applications',
    excerpt:
      'Explore how design systems enable consistency, efficiency, and scalability in modern application development.',
    content: `
# Design Systems for Scalable Applications

A well-designed design system is the foundation of scalable, maintainable, and consistent applications. This article explores the principles and practices for creating effective design systems.

## What is a Design System?

A design system is a comprehensive collection of reusable components, guided by clear standards, that can be assembled to build applications efficiently and consistently.

### Core Components

- **Design Tokens**: Colors, typography, spacing, and other foundational values
- **Component Library**: Reusable UI components
- **Patterns**: Common UI patterns and layouts
- **Guidelines**: Usage documentation and best practices
- **Tools**: Design tools, code libraries, and documentation

## Benefits of Design Systems

1. **Consistency**: Uniform user experience across all touchpoints
2. **Efficiency**: Faster development with reusable components
3. **Scalability**: Easy to maintain and extend
4. **Collaboration**: Better communication between design and development
5. **Quality**: Higher quality through tested, refined components

## Building a Design System

### Step 1: Define Design Tokens

\`\`\`typescript
// Example: Design tokens configuration
export const designTokens = {
  colors: {
    primary: '#0078D4',
    secondary: '#50E6FF',
    background: '#FFFFFF',
    text: '#323130',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      small: '12px',
      medium: '14px',
      large: '20px',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};
\`\`\`

### Step 2: Create Component Library

Build reusable components that implement your design tokens:

- Buttons
- Forms
- Cards
- Navigation
- Modals
- Data tables

### Step 3: Document Everything

Clear documentation is crucial for adoption:

- Component API documentation
- Usage examples and best practices
- Accessibility guidelines
- Design principles

### Step 4: Implement Versioning

Use semantic versioning to manage changes and updates to your design system.

## Integration with Fluent UI

At Fluxline, we leverage Fluent UI as the foundation for our design system, extending it with custom themes and components:

\`\`\`typescript
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export function ThemedButton() {
  const { theme } = useAppTheme();
  
  return (
    <button
      style={{
        backgroundColor: theme.palette.themePrimary,
        color: theme.palette.white,
        padding: theme.spacing.m,
        borderRadius: theme.effects.roundedCorner2,
      }}
    >
      Click Me
    </button>
  );
}
\`\`\`

## Best Practices

1. **Start Small**: Begin with core components and expand gradually
2. **Design for Accessibility**: Build accessibility in from the start
3. **Maintain Flexibility**: Allow customization while maintaining consistency
4. **Iterate Based on Feedback**: Continuously improve based on user needs
5. **Automate Testing**: Ensure components work across all scenarios

## Challenges and Solutions

- **Adoption**: Provide excellent documentation and examples
- **Maintenance**: Dedicate resources to ongoing support
- **Evolution**: Balance stability with innovation
- **Customization**: Allow theming and configuration

## Conclusion

A well-implemented design system is an investment that pays dividends in consistency, efficiency, and scalability. By following best practices and continuously iterating, you can create a design system that empowers your teams and delights your users.
`,
    author: 'Fluxline Resonance Group',
    publishedDate: new Date('2025-01-10'),
    imageUrl: undefined,
    imageAlt: 'Design Systems for Scalable Applications',
    tags: ['Design Systems', 'UI/UX', 'Component Libraries', 'Development'],
    category: 'Design',
    featured: false,
    seoMetadata: {
      title: 'Design Systems for Scalable Applications | Fluxline Pro',
      description:
        'Explore how design systems enable consistency, efficiency, and scalability in modern application development.',
      keywords: [
        'design systems',
        'component libraries',
        'UI/UX',
        'design tokens',
        'Fluent UI',
      ],
    },
  },
  {
    id: 'typescript-best-practices-enterprise',
    slug: 'typescript-best-practices-enterprise',
    title: 'TypeScript Best Practices for Enterprise Applications',
    excerpt:
      'Learn advanced TypeScript patterns and practices that ensure type safety, maintainability, and scalability in large applications.',
    content: `
# TypeScript Best Practices for Enterprise Applications

TypeScript has become the standard for building large-scale JavaScript applications. This guide covers best practices and advanced patterns for enterprise-grade TypeScript development.

## Type System Fundamentals

### Strong Typing

Always prefer explicit types over implicit any:

\`\`\`typescript
// ❌ Avoid
function processData(data: any) {
  return data.value;
}

// ✅ Prefer
interface DataItem {
  id: string;
  value: number;
  metadata?: Record<string, unknown>;
}

function processData(data: DataItem): number {
  return data.value;
}
\`\`\`

### Utility Types

Leverage TypeScript's built-in utility types:

\`\`\`typescript
// Partial, Required, Readonly, Pick, Omit
type UserProfile = {
  id: string;
  name: string;
  email: string;
  age: number;
};

// Only name and email are required for updates
type UserUpdate = Partial<UserProfile>;

// Pick specific fields
type UserSummary = Pick<UserProfile, 'id' | 'name'>;
\`\`\`

## Advanced Patterns

### Discriminated Unions

Use discriminated unions for type-safe state management:

\`\`\`typescript
type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return response.data; // TypeScript knows data exists here
    case 'error':
      return response.error.message; // TypeScript knows error exists here
  }
}
\`\`\`

### Generics

Create reusable, type-safe components:

\`\`\`typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  // Implementation
}
\`\`\`

## Project Configuration

### tsconfig.json Best Practices

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "jsx": "react-jsx"
  }
}
\`\`\`

## Error Handling

Implement type-safe error handling:

\`\`\`typescript
class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

type Result<T, E = ApplicationError> =
  | { success: true; value: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await api.getUser(id);
    return { success: true, value: user };
  } catch (error) {
    return {
      success: false,
      error: new ApplicationError(
        'Failed to fetch user',
        'USER_FETCH_ERROR',
        500
      ),
    };
  }
}
\`\`\`

## Testing with TypeScript

\`\`\`typescript
import { describe, it, expect } from 'jest';

describe('User Service', () => {
  it('should create a user with valid data', async () => {
    const userData: Omit<User, 'id'> = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    };

    const result = await userService.create(userData);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(userData.name);
  });
});
\`\`\`

## Best Practices Summary

1. **Enable Strict Mode**: Always use strict TypeScript settings
2. **Avoid Any**: Use unknown or proper types instead
3. **Use Type Guards**: Implement runtime type checking
4. **Document Types**: Add JSDoc comments for complex types
5. **Organize Types**: Keep type definitions in dedicated files
6. **Use Enums Wisely**: Prefer const enums or string unions
7. **Leverage Type Inference**: Let TypeScript infer types when obvious

## Conclusion

TypeScript's type system is powerful and flexible. By following these best practices and patterns, you can build robust, maintainable, and scalable enterprise applications with confidence.
`,
    author: 'Fluxline Resonance Group',
    publishedDate: new Date('2025-01-05'),
    imageUrl: undefined,
    imageAlt: 'TypeScript Best Practices',
    tags: ['TypeScript', 'Programming', 'Best Practices', 'Development'],
    category: 'Technology',
    featured: false,
    seoMetadata: {
      title:
        'TypeScript Best Practices for Enterprise Applications | Fluxline Pro',
      description:
        'Advanced TypeScript patterns and practices that ensure type safety, maintainability, and scalability in large applications.',
      keywords: [
        'TypeScript',
        'best practices',
        'type safety',
        'enterprise development',
        'programming',
      ],
    },
  },
];

/**
 * Get all blog posts
 */
export function getBlogPosts(filters?: {
  tag?: string;
  category?: string;
}): BlogPost[] {
  let posts = [...blogPostsMockData];

  if (filters?.tag) {
    posts = posts.filter((post) => post.tags.includes(filters.tag!));
  }

  if (filters?.category) {
    posts = posts.filter((post) => post.category === filters.category);
  }

  return posts.sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
}

/**
 * Get unique tags from all posts
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPostsMockData.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get unique categories from all posts
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  blogPostsMockData.forEach((post) => {
    categories.add(post.category);
  });
  return Array.from(categories).sort();
}
