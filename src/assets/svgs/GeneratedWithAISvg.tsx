import React from 'react';

interface GeneratedWithAISvgProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Generated With AI SVG Icon
 * Four-pointed sparkle star icon representing AI-generated content
 */
export const GeneratedWithAISvg: React.FC<GeneratedWithAISvgProps> = ({
  className,
  style,
}) => {
  return (
    <svg
      className={className}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      {/* Large central 4-pointed sparkle star */}
      <path d='M12 1c.4 0 .75.3.75.68 0 2.56.68 4.1 1.8 5.22C15.67 8 17.2 8.68 19.77 8.68c.38 0 .68.34.68.75 0 .4-.3.75-.68.75-2.56 0-4.1.68-5.22 1.8C13.43 13.1 12.75 14.63 12.75 17.2c0 .38-.34.68-.75.68-.4 0-.75-.3-.75-.68 0-2.56-.68-4.1-1.8-5.22C8.33 10.86 6.8 10.18 4.23 10.18c-.38 0-.68-.34-.68-.75 0-.4.3-.75.68-.75 2.56 0 4.1-.68 5.22-1.8C10.57 5.76 11.25 4.23 11.25 1.68c0-.38.34-.68.75-.68Z' />
      {/* Small upper-right sparkle */}
      <path d='M19 1c.27 0 .5.2.5.45 0 1.26.33 2 .88 2.56.55.55 1.3.88 2.56.88.25 0 .45.22.45.5 0 .27-.2.5-.45.5-1.26 0-2 .33-2.56.88-.55.55-.88 1.3-.88 2.56 0 .25-.22.45-.5.45-.27 0-.5-.2-.5-.45 0-1.26-.33-2-.88-2.56-.55-.55-1.3-.88-2.56-.88-.25 0-.45-.22-.45-.5 0-.27.2-.5.45-.5 1.26 0 2-.33 2.56-.88C18.67 3 19 2.26 19 1c0-.25.22-.45.5-.45Z'
        opacity='0.85'
      />
      {/* Tiny bottom-left sparkle */}
      <path d='M5 17c.2 0 .37.15.37.34 0 .93.25 1.5.66 1.9.4.41.97.66 1.9.66.19 0 .34.17.34.38 0 .2-.15.37-.34.37-.93 0-1.5.25-1.9.66-.41.4-.66.97-.66 1.9 0 .19-.17.34-.37.34-.2 0-.37-.15-.37-.34 0-.93-.25-1.5-.66-1.9C3.57 21.03 3 20.78 3 19.85c0-.19.17-.34.37-.34.93 0 1.5-.25 1.9-.66.41-.4.66-.97.66-1.9 0-.2.17-.37.37-.38Z'
        opacity='0.7'
      />
    </svg>
  );
};

export default GeneratedWithAISvg;
