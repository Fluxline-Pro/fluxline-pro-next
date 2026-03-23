'use client';

import React from 'react';
import { FormButton } from '@/theme/components/form';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { ConsultationStepper } from '@/components/ConsultationStepper';

interface BookingsButtonProps {
  animateSubHeader?: boolean;
  willAnimate?: boolean;
  style?: React.CSSProperties;
  className?: string;
  isHomePage?: boolean;
}

/**
 * BookingsButton Component
 *
 * Opens the ConsultationStepper modal for guided onboarding.
 * Adapts styling based on device orientation and animation state.
 */
export const BookingsButton: React.FC<BookingsButtonProps> = ({
  animateSubHeader,
  willAnimate,
  style,
  className,
  isHomePage = false,
}) => {
  const orientation = useDeviceOrientation();
  const [stepperOpen, setStepperOpen] = React.useState(false);

  const handleClick = () => {
    setStepperOpen(true);
  };

  // Build responsive font size based on orientation
  const getResponsiveFontSize = () => {
    if (orientation === 'portrait') {
      return 'clamp(1.1rem, 3.2cqi, 1.5rem)';
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
    marginTop: orientation === 'portrait' || isHomePage ? '0 !important' : '1rem',
    padding: '0.75rem 1rem',
    minHeight: orientation === 'portrait' ? '40px' : undefined,
    minWidth: '250px',
    maxWidth: isHomePage ? undefined : '500px',
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
      animationDelay: '0.8s',
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
    <>
      <FormButton
        variant='primary'
        size='medium'
        onClick={handleClick}
        style={buttonStyles}
        className={className}
        id='bookings-button'
      >
        Start a Conversation
      </FormButton>
      <ConsultationStepper
        isOpen={stepperOpen}
        onDismiss={() => setStepperOpen(false)}
      />
    </>
  );
};

export default BookingsButton;
