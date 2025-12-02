import type { Meta, StoryObj } from '@storybook/react';
import { CueCard } from './cue-card';

const meta = {
  title: 'Theme/Components/CueCard',
  component: CueCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CueCard component displays modular "cue cards" that summarize key archetypes, mantras, and actions for Fluxline\'s mythic curriculum.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'inline'],
      description: 'Display variant for different contexts',
    },
    data: {
      description: 'Cue card data object with all card properties',
    },
  },
} satisfies Meta<typeof CueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      id: 'rebuilder',
      icon: '🏋️',
      title: 'The Rebuilder',
      mantra: 'I rise stronger through structure.',
      action: 'Begin 4-week PT on-ramp',
      overlay:
        'This client honors repetition and mythic milestones. Each session is a brick laid toward the temple of self.',
      link: '/services/personal-training',
      linkText: 'Start Your Journey',
      tags: ['strength', 'discipline', 'foundation'],
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    data: {
      id: 'alchemist',
      title: 'The Alchemist',
      mantra: 'From chaos, I craft gold.',
      action: 'Schedule your transformation consultation',
      overlay:
        'The Alchemist sees potential in the raw and unrefined. Every challenge is an ingredient for transmutation.',
      link: '/contact',
    },
  },
};

export const WithoutLink: Story = {
  args: {
    data: {
      id: 'navigator',
      icon: '🧭',
      title: 'The Navigator',
      mantra: 'I chart my course through unknown waters.',
      action: 'Map your strategic vision',
      overlay:
        'The Navigator thrives in ambiguity, finding direction where others see only fog.',
    },
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    data: {
      id: 'healer',
      icon: '💚',
      title: 'The Healer',
      mantra: 'Through rest, I restore.',
      action: 'Integrate a recovery ritual',
      overlay:
        'The Healer understands that growth happens in stillness. Restoration is not weakness—it is wisdom.',
      link: '/services/personal-training',
      tags: ['recovery', 'balance'],
    },
  },
};

export const Inline: Story = {
  args: {
    variant: 'inline',
    data: {
      id: 'mentor',
      icon: '📚',
      title: 'The Mentor',
      mantra: 'I light the path for others.',
      action: 'Share one insight today',
      overlay:
        'The Mentor carries wisdom earned through experience. Teaching is the highest form of learning.',
      link: '/services/coaching',
    },
  },
};

export const WithTags: Story = {
  args: {
    data: {
      id: 'warrior',
      icon: '⚔️',
      title: 'The Warrior',
      mantra: 'I face what must be faced.',
      action: 'Identify your resistance',
      overlay:
        'The Warrior does not seek conflict but does not shrink from necessary battles. Courage is a daily practice.',
      tags: ['courage', 'discipline', 'strength', 'focus'],
    },
  },
};
