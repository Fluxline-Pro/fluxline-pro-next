'use client';

import React from 'react';

interface ProtectedEmailProps {
  username: string;
  domain: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * ProtectedEmail Component
 *
 * Renders email addresses client-side to prevent crawler detection
 * Uses obfuscation techniques and client-side rendering
 */
export const ProtectedEmail: React.FC<ProtectedEmailProps> = ({
  username,
  domain,
  children,
  style,
  className,
}) => {
  // Obfuscate by reversing and encoding
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = `${username}@${domain}`;
    window.location.href = `mailto:${email}`;
  };

  // Display obfuscated version
  const displayEmail = `${username} [at] ${domain}`;

  return (
    <button
      type='button'
      onClick={handleClick}
      className={className}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        textDecoration: 'underline',
        color: 'inherit',
        font: 'inherit',
        ...style,
      }}
      title={`Send email to ${username} at ${domain}`}
    >
      {children || displayEmail}
    </button>
  );
};

export default ProtectedEmail;
