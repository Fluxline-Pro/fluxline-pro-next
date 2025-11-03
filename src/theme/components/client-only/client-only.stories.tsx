import type { Meta, StoryObj } from '@storybook/react';
import { ClientOnly } from './client-only';

const meta = {
  title: 'Theme/Components/ClientOnly',
  component: ClientOnly,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ClientOnly component with Fluent UI theming support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to render on client side',
    },
    fallback: {
      control: 'text',
      description: 'Content to render during SSR (before hydration)',
    },
  },
} satisfies Meta<typeof ClientOnly>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This renders only on client',
  },
};

export const WithFallback: Story = {
  args: {
    children: 'Client-side content',
    fallback: 'Loading...',
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <div>
        <h3>Complex Content</h3>
        <p>This ClientOnly contains multiple elements.</p>
        <button>Interactive Element</button>
      </div>
    ),
    fallback: <div>Loading complex content...</div>,
  },
};

export const WithComponentChildren: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', border: '2px solid blue' }}>
        <p>This content only appears after client hydration</p>
        <button onClick={() => alert('Client-side interaction!')}>
          Click Me
        </button>
      </div>
    ),
    fallback: (
      <div style={{ padding: '20px', border: '2px solid gray' }}>
        <p>SSR placeholder content</p>
      </div>
    ),
  },
};
