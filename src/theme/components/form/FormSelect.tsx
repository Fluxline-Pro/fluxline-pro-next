'use client';

import React from 'react';

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
          borderRadius: 'var(--fx-radius-control)',
          backgroundColor: 'var(--fx-surface-card)',
          border: '1px solid var(--fx-border)',
        }
      : {};

  const selectContent = (
    <div style={{ flex: 1, width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <p
          style={{
            color: 'var(--fx-text-heading)',
            fontSize: 'var(--fx-body-sm-size)',
            fontWeight: 600,
            marginBottom: description ? '0.25rem' : '0.5rem',
            display: 'block',
            margin: 0,
            marginBlockEnd: description ? '0.25rem' : '0.5rem',
          }}
        >
          {label}
        </p>
      )}
      {description && (
        <p
          style={{
            color: 'var(--fx-text-muted)',
            fontSize: 'var(--fx-body-sm-size)',
            lineHeight: 1.7,
            marginBottom: '0.5rem',
            display: 'block',
            margin: 0,
            marginBlockEnd: '0.5rem',
          }}
        >
          {description}
        </p>
      )}

      {multiSelect ? (
        // Multi-select with dropdown and checkboxes
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            type='button'
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-label={ariaLabel || label}
            aria-haspopup='listbox'
            aria-expanded={isOpen}
            style={{
              width: '100%',
              padding: '0.5rem 2rem 0.5rem 0.75rem',
              borderRadius: 'var(--fx-radius-control)',
              backgroundColor: 'var(--fx-surface-input)',
              border: `1px solid ${isOpen ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
              color:
                selectedKeys.length === 0
                  ? 'var(--fx-text-muted)'
                  : 'var(--fx-text-heading)',
              fontSize: 'var(--fx-body-size)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--fx-font)',
              opacity: disabled ? 0.6 : 1,
              transition: 'border-color 0.2s ease',
              outline: 'none',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--fx-accent)';
            }}
            onBlur={(e) => {
              if (!isOpen)
                e.currentTarget.style.borderColor = 'var(--fx-border)';
            }}
          >
            <span>{getMultiSelectDisplayText()}</span>
            <span
              style={{
                position: 'absolute',
                right: '0.625rem',
                top: '50%',
                transform: isOpen
                  ? 'translateY(-50%) rotate(180deg)'
                  : 'translateY(-50%) rotate(0deg)',
                transition: 'transform 0.2s ease',
                fontSize: '0.65rem',
                pointerEvents: 'none',
              }}
            >
              ▼
            </span>
          </button>

          {isOpen && (
            <div
              role='listbox'
              aria-multiselectable='true'
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid var(--fx-border)',
                borderRadius: 'var(--fx-radius-control)',
                backgroundColor: 'var(--fx-surface-input)',
                boxShadow: 'var(--fx-toast-shadow)',
                zIndex: 500,
              }}
            >
              {options.map((option) => (
                <label
                  key={option.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    borderBottom: '1px solid var(--fx-surface-card)',
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled) {
                      e.currentTarget.style.backgroundColor =
                        'var(--fx-surface-card)';
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
                  <span
                    style={{
                      color: 'var(--fx-text-heading)',
                      fontSize: 'var(--fx-body-size)',
                    }}
                  >
                    {option.text}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Single-select: custom button + dropdown matching FormInput/FormDateInput styling
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            type='button'
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-label={ariaLabel || label}
            aria-haspopup='listbox'
            aria-expanded={isOpen}
            style={{
              width: '100%',
              padding: '0.5rem 2rem 0.5rem 0.75rem',
              borderRadius: 'var(--fx-radius-control)',
              backgroundColor: 'var(--fx-surface-input)',
              border: `1px solid ${isOpen ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
              color:
                !value || value === ''
                  ? 'var(--fx-text-muted)'
                  : 'var(--fx-text-heading)',
              fontSize: 'var(--fx-body-size)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--fx-font)',
              opacity: disabled ? 0.6 : 1,
              transition: 'border-color 0.2s ease',
              outline: 'none',
              textAlign: 'left',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              position: 'relative',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--fx-accent)';
            }}
            onBlur={(e) => {
              if (!isOpen)
                e.currentTarget.style.borderColor = 'var(--fx-border)';
            }}
          >
            {value
              ? options.find((opt) => opt.key === value)?.text ??
                (placeholder || 'Select...')
              : placeholder || 'Select...'}
            <span
              style={{
                position: 'absolute',
                right: '0.625rem',
                top: '50%',
                transform: isOpen
                  ? 'translateY(-50%) rotate(180deg)'
                  : 'translateY(-50%) rotate(0deg)',
                transition: 'transform 0.2s ease',
                fontSize: '0.65rem',
                pointerEvents: 'none',
              }}
            >
              ▼
            </span>
          </button>

          {isOpen && (
            <div
              role='listbox'
              aria-label={ariaLabel || label}
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid var(--fx-border)',
                borderRadius: 'var(--fx-radius-control)',
                backgroundColor: 'var(--fx-surface-input)',
                boxShadow: 'var(--fx-toast-shadow)',
                zIndex: 500,
              }}
            >
              {placeholder && (
                <button
                  key='__placeholder__'
                  role='option'
                  aria-selected={!value || value === ''}
                  type='button'
                  onClick={() => {
                    onChange?.('');
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    background:
                      !value || value === ''
                        ? 'var(--fx-surface-card)'
                        : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--fx-surface-card)',
                    color: 'var(--fx-text-muted)',
                    fontSize: 'var(--fx-body-size)',
                    fontFamily: 'var(--fx-font)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--fx-surface-card)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      !value || value === ''
                        ? 'var(--fx-surface-card)'
                        : 'transparent';
                  }}
                >
                  {placeholder}
                </button>
              )}
              {options.map((option) => (
                <button
                  key={option.key}
                  role='option'
                  aria-selected={value === option.key}
                  type='button'
                  onClick={() => {
                    onChange?.(option.key);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'left',
                    background:
                      value === option.key
                        ? 'var(--fx-surface-card)'
                        : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--fx-surface-card)',
                    color: 'var(--fx-text-heading)',
                    fontSize: 'var(--fx-body-size)',
                    fontFamily: 'var(--fx-font)',
                    cursor: 'pointer',
                    fontWeight:
                      value === option.key ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'var(--fx-surface-card)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      value === option.key
                        ? 'var(--fx-surface-card)'
                        : 'transparent';
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Wrap in container if icon or description exists
  if (icon || description) {
    return (
      <div style={containerStyles}>
        {icon && (
          <span
            style={{
              color: 'var(--fx-accent)',
              fontSize: '1.25rem',
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-hidden='true'
          >
            {icon}
          </span>
        )}
        {selectContent}
      </div>
    );
  }

  return selectContent;
};
