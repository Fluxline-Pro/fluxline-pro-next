'use client';

import React from 'react';
import { Button } from '../button';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';

interface BookingsButtonProps {
  animateSubHeader?: boolean;
  willAnimate?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * BookingsButton Component
 * 
 * Specialized button for opening booking calendar.
 * Adapts styling based on device orientation and animation state.
 */
export const BookingsButton: React.FC<BookingsButtonProps> = ({
  animateSubHeader,
  willAnimate,
  style,
  className,
}) => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  const handleClick = () => {
    const url =
      'https://outlook.office.com/owa/calendar/Bookings@terencewaters.com/bookings/';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Build responsive font size based on orientation
  const getResponsiveFontSize = () => {
    if (orientation === 'portrait') {
      return 'clamp(1.2rem, 3.2cqi, 1.8rem)';
    }
    if (orientation === 'square') {
      return 'clamp(1.25rem, 3.7cqi, 1.3rem)';
    }
    if (orientation === 'mobile-landscape') {
      return 'clamp(1.2rem, 3.2cqi, 1.5rem)';
    }
    // landscape or ultrawide
    return 'clamp(1.25rem, 2.2cqi, 1.5rem)';
  };

  const buttonStyles: React.CSSProperties = {
    marginTop: orientation === 'portrait' ? '0' : '1rem',
    padding: '12px 16px',
    minHeight: orientation === 'portrait' ? '40px' : undefined,
    minWidth: '250px',
    maxWidth: '500px',
    width: animateSubHeader || orientation === 'portrait' ? '100%' : 'auto',
    fontSize: getResponsiveFontSize(),
    fontWeight: '600',
    boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
    // Animation states
    ...(willAnimate &&
      !animateSubHeader && {
        opacity: 0,
        transform: 'translateY(20px)',
      }),
    ...(animateSubHeader === true && {
      opacity: 0,
      transform: 'translateY(20px)',
      animation: 'slideInUp 0.4s ease-in-out forwards',
      animationDelay: '2.1s',
    }),
    ...(animateSubHeader === false &&
      !willAnimate && {
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ...(animateSubHeader === undefined &&
      !willAnimate && {
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ...style,
  };

  return (
    <Button
      variant='primary'
      size='medium'
      onClick={handleClick}
      style={buttonStyles}
      className={className}
      id='bookings-button'
    >
      Book a free consultation
    </Button>
  );
};

export default BookingsButton;
