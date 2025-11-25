'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface FormSelectOption {
  key: string;
  text: string;
}

export interface FormSelectProps {
  label?: string;
  description?: string;
  icon?: string;
  value?: string;
  options: FormSelectOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  multiSelect?: boolean;
  selectedKeys?: string[];
  onMultiChange?: (keys: string[]) => void;
  'aria-label'?: string;
}

/**
 * FormSelect Component
 * Consistent dropdown/select component following Fluxline DSM
 *
 * Features:
 * - Theme-aware styling with proper contrast
 * - Optional icon and description
 * - Support for both single and multi-select
 * - Accessible with ARIA labels
 * - Responsive font scaling
 */
export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  description,
  icon,
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
  fullWidth = true,
  multiSelect = false,
  selectedKeys = [],
  onMultiChange,
  'aria-label': ariaLabel,
}) => {
  const { theme, fontScale } = useAppTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // For multi-select, handle checkbox changes
  const handleMultiSelectChange = (optionKey: string, checked: boolean) => {
    if (!onMultiChange) return;

    const newKeys = checked
      ? [...selectedKeys, optionKey]
      : selectedKeys.filter((k) => k !== optionKey);

    onMultiChange(newKeys);
  };

  // Get display text for multi-select
  const getMultiSelectDisplayText = () => {
    if (selectedKeys.length === 0) {
      return placeholder || 'Select options...';
    }
    if (selectedKeys.length === 1) {
      return options.find((opt) => opt.key === selectedKeys[0])?.text || '';
    }
    return `${selectedKeys.length} selected`;
  };

  const containerStyles: React.CSSProperties =
    icon || description
      ? {
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          padding: '1rem',
          borderRadius: theme.borderRadius.container.small,
          backgroundColor: theme.palette.neutralLighterAlt,
          border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
        }
      : {};

  const selectContent = (
    <div style={{ flex: 1, width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: `${1 * fontScale}rem`,
            fontWeight: theme.typography.fontWeights.semiBold,
            marginBottom: description ? '0.25rem' : '0.5rem',
            display: 'block',
          }}
        >
          {label}
        </Typography>
      )}
      {description && (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: `${0.875 * fontScale}rem`,
            lineHeight: theme.typography.lineHeights.normal,
            marginBottom: '0.5rem',
            display: 'block',
          }}
        >
          {description}
        </Typography>
      )}

      {multiSelect ? (
        // Multi-select with dropdown and checkboxes
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            type='button'
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-label={ariaLabel || label}
            aria-expanded={isOpen}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: theme.borderRadius.container.small,
              backgroundColor: theme.palette.neutralLight,
              border: `1px solid ${isOpen ? theme.palette.themePrimary : theme.palette.neutralTertiaryAlt}`,
              color:
                selectedKeys.length === 0
                  ? theme.palette.neutralSecondary
                  : theme.palette.neutralPrimary,
              fontSize: `${0.875 * fontScale}rem`,
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: theme.typography.fonts.body.fontFamily,
              opacity: disabled ? 0.6 : 1,
              transition: 'border-color 0.2s ease',
              outline: 'none',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{getMultiSelectDisplayText()}</span>
            <span
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                fontSize: '0.7rem',
              }}
            >
              ▼
            </span>
          </button>

          {isOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                maxHeight: '200px',
                overflowY: 'auto',
                border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
                borderRadius: theme.borderRadius.container.small,
                backgroundColor: theme.palette.white,
                boxShadow: theme.effects.elevation8,
                zIndex: 1000,
              }}
            >
              {options.map((option) => (
                <label
                  key={option.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    borderBottom: `1px solid ${theme.palette.neutralLighter}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled) {
                      e.currentTarget.style.backgroundColor =
                        theme.palette.neutralLighter;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <input
                    type='checkbox'
                    checked={selectedKeys.includes(option.key)}
                    onChange={(e) =>
                      handleMultiSelectChange(option.key, e.target.checked)
                    }
                    disabled={disabled}
                    style={{
                      marginRight: '0.5rem',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  />
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.neutralPrimary,
                      fontSize: `${0.875 * fontScale}rem`,
                    }}
                  >
                    {option.text}
                  </Typography>
                </label>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Standard single-select dropdown
        <select
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          aria-label={ariaLabel || label}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: theme.borderRadius.container.small,
            backgroundColor: theme.palette.neutralLight,
            border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
            color: theme.palette.neutralPrimary,
            fontSize: `${0.875 * fontScale}rem`,
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: theme.typography.fonts.body.fontFamily,
            opacity: disabled ? 0.6 : 1,
            transition: 'border-color 0.2s ease',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = theme.palette.themePrimary;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              theme.palette.neutralTertiaryAlt;
          }}
        >
          {placeholder && <option value=''>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.text}
            </option>
          ))}
        </select>
      )}
    </div>
  );

  // Wrap in container if icon or description exists
  if (icon || description) {
    return (
      <div style={containerStyles}>
        {icon && (
          <FluentIcon
            iconName={icon}
            size='medium'
            color={theme.palette.themePrimary}
          />
        )}
        {selectContent}
      </div>
    );
  }

  return selectContent;
};
