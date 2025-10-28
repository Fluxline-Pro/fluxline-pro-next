import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta = {
  title: 'Theme/Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card component with Fluent UI theming support.',
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Card',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Styled Card',
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
        <p>This Card contains multiple elements.</p>
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
