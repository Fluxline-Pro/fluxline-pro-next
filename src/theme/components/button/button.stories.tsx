import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Theme/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component with Fluent UI theming support.',
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Styled Button',
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
        <p>This Button contains multiple elements.</p>
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
