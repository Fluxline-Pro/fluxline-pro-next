import React from 'react';
import { useTheme } from '@fluentui/react';

export const GeometricBackground: React.FC = () => {
  const theme = useTheme();

  // Mapping the design's colors to Fluent UI theme slots.
  // Assuming a dark theme is configured in your Fluent UI setup.
  const primaryColor = theme.palette.themePrimary || '#00f0ff';
  const secondaryColor = theme.palette.themeLight || '#0088cc';
  const bgColorStart = theme.palette.themeDarker || '#021626';
  const bgColorEnd = theme.palette.neutralDark || '#010a12';

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${bgColorStart} 0%, ${bgColorEnd} 100%)`,
        zIndex: -1,
      }}
    >
      <svg
        viewBox='0 0 1920 1080'
        preserveAspectRatio='xMidYMid slice'
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Glow filter for the nodes */}
          <filter id='glow' x='-20%' y='-20%' width='140%' height='140%'>
            <feGaussianBlur stdDeviation='8' result='blur' />
            <feComposite in='SourceGraphic' in2='blur' operator='over' />
          </filter>

          {/* Keyframe Animations injected directly into the SVG */}
          <style>
            {`
              @keyframes drawLine {
                0% { stroke-dashoffset: 2000; opacity: 0; }
                10% { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
              }
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 0.3; }
              }
              @keyframes pulseGlow {
                0%, 100% { opacity: 0.6; r: 3; }
                50% { opacity: 1; r: 5; }
              }
              @keyframes slowTurn {
                0% { transform: rotate(0deg) translate(0px, 0px) scale(1); }
                100% { transform: rotate(-2deg) translate(-20px, 15px) scale(1.02); }
              }
              
              .animated-path {
                stroke-dasharray: 2000;
                stroke-dashoffset: 2000;
                animation: drawLine 4s ease-out forwards;
              }
              
              .delayed-path-1 { animation-delay: 0.5s; }
              .delayed-path-2 { animation-delay: 1.5s; }
              .delayed-path-3 { animation-delay: 2s; }

              .geometric-cluster {
                transform-origin: 1600px 540px;
                animation: slowTurn 15s infinite alternate ease-in-out;
              }

              .node-pulse {
                animation: pulseGlow 4s infinite ease-in-out;
              }
              
              .faint-polygon {
                opacity: 0;
                animation: fadeIn 5s ease-in forwards;
                animation-delay: 3s;
              }
            `}
          </style>
        </defs>

        {/* Group containing the turning geometry */}
        <g className='geometric-cluster'>
          {/* Faint background polygons (Opacity layers) */}
          <polygon
            points='1300,150 1700,50 1650,450'
            fill={secondaryColor}
            className='faint-polygon'
            style={{ opacity: 0.05 }}
          />
          <polygon
            points='1650,450 1850,350 1550,750 1100,650'
            fill={primaryColor}
            className='faint-polygon'
            style={{ opacity: 0.03 }}
          />
          <polygon
            points='1100,650 1550,750 1400,1050 850,950'
            fill={secondaryColor}
            className='faint-polygon'
            style={{ opacity: 0.04 }}
          />

          {/* Dotted Connection Lines */}
          <path
            d='M 1300 150 L 1650 450 M 1100 650 L 1400 1050 M 1650 450 L 1100 650'
            stroke={secondaryColor}
            strokeWidth='1'
            strokeDasharray='4 8'
            fill='none'
            style={{ opacity: 0.4 }}
          />

          {/* Solid Animated Lines */}
          <g stroke={primaryColor} strokeWidth='1.5' fill='none'>
            {/* Top Right Web */}
            <path
              className='animated-path'
              d='M 1950 -50 L 1300 150 L 1700 50 L 1850 350 Z'
            />
            <path
              className='animated-path delayed-path-1'
              d='M 1300 150 L 1650 450 L 1850 350'
            />

            {/* Middle connecting structure */}
            <path
              className='animated-path delayed-path-1'
              d='M 1650 450 L 1550 750 L 1850 350'
            />
            <path
              className='animated-path delayed-path-2'
              d='M 1100 650 L 1650 450'
            />
            <path
              className='animated-path delayed-path-2'
              d='M 1100 650 L 1550 750 L 1400 1050'
            />

            {/* Bottom Left Web */}
            <path
              className='animated-path delayed-path-3'
              d='M 1100 650 L 850 950 L 1400 1050 Z'
            />
            <path
              className='animated-path delayed-path-3'
              d='M 850 950 L 700 1150 L 1400 1050'
            />
          </g>

          {/* Glowing Intersecting Nodes */}
          <g fill={primaryColor} filter='url(#glow)'>
            <circle
              cx='1300'
              cy='150'
              className='node-pulse'
              style={{ animationDelay: '0s' }}
            />
            <circle
              cx='1700'
              cy='50'
              className='node-pulse'
              style={{ animationDelay: '1s' }}
            />
            <circle
              cx='1650'
              cy='450'
              className='node-pulse'
              style={{ animationDelay: '0.5s' }}
            />
            <circle
              cx='1850'
              cy='350'
              className='node-pulse'
              style={{ animationDelay: '1.5s' }}
            />
            <circle
              cx='1100'
              cy='650'
              className='node-pulse'
              style={{ animationDelay: '2s' }}
            />
            <circle
              cx='1550'
              cy='750'
              className='node-pulse'
              style={{ animationDelay: '0.3s' }}
            />
            <circle
              cx='850'
              cy='950'
              className='node-pulse'
              style={{ animationDelay: '1.2s' }}
            />
            <circle
              cx='1400'
              cy='1050'
              className='node-pulse'
              style={{ animationDelay: '0.8s' }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
