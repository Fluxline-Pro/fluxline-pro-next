'use client';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { HeroSimple, HeroSimpleProps } from './HeroSimple';
import { TagChip } from './TagChip';

export interface HeroWithFiltersProps extends HeroSimpleProps {
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
}

export function HeroWithFilters({
  availableTags,
  selectedTags,
  onToggleTag,
  startDate = '',
  endDate = '',
  onStartDateChange,
  onEndDateChange,
  ...heroProps
}: HeroWithFiltersProps) {
  const { theme } = useAppTheme();

  return (
    <section>
      <HeroSimple {...heroProps} />

      <div
        className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'
        style={{ marginTop: theme.spacing.l }}
      >
        <div className='flex flex-wrap gap-2' role='group' aria-label='Filter by tag'>
          {availableTags.map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              active={selectedTags.includes(tag)}
              onClick={() => onToggleTag(tag)}
            />
          ))}
        </div>

        <div className='flex flex-col gap-2 sm:flex-row'>
          <label className='flex flex-col text-sm'>
            Date From
            <input
              type='date'
              value={startDate}
              onChange={(event) => onStartDateChange?.(event.target.value)}
              style={{
                border: `1px solid ${theme.palette.neutralQuaternary}`,
                borderRadius: theme.borderRadius.container.small,
                padding: theme.spacing.s,
                backgroundColor: theme.palette.white,
              }}
            />
          </label>
          <label className='flex flex-col text-sm'>
            Date To
            <input
              type='date'
              value={endDate}
              onChange={(event) => onEndDateChange?.(event.target.value)}
              style={{
                border: `1px solid ${theme.palette.neutralQuaternary}`,
                borderRadius: theme.borderRadius.container.small,
                padding: theme.spacing.s,
                backgroundColor: theme.palette.white,
              }}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

export default HeroWithFilters;
