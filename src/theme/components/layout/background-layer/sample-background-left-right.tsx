import React from 'react';
import { useTheme } from '@fluentui/react';

export const GeometricBackground: React.FC = () => {
  const theme = useTheme();

  // Mapping Fluxline brand colors to Fluent UI theme slots.
  const primaryColor = theme.palette.themePrimary || '#00f0ff';
  const secondaryColor = theme.palette.themeLight || '#0088cc';
  const accentGlow = theme.palette.themeTertiary || '#55ffff';
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
          {/* Base glow filter */}
          <filter id='glow' x='-20%' y='-20%' width='140%' height='140%'>
            <feGaussianBlur stdDeviation='6' result='blur' />
            <feComposite in='SourceGraphic' in2='blur' operator='over' />
          </filter>

          {/* Intense glow filter for primary nodes */}
          <filter
            id='intense-glow'
            x='-50%'
            y='-50%'
            width='200%'
            height='200%'
          >
            <feGaussianBlur stdDeviation='12' result='blur1' />
            <feGaussianBlur stdDeviation='4' result='blur2' />
            <feMerge>
              <feMergeNode in='blur1' />
              <feMergeNode in='blur2' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>

          <style>
            {`
              @keyframes drawLine {
                0% { stroke-dashoffset: 3000; opacity: 0; }
                5% { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
              }
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 0.25; }
              }
              @keyframes pulseGlow {
                0%, 100% { opacity: 0.5; r: 2.5; }
                50% { opacity: 1; r: 4.5; }
              }
              @keyframes pulseIntense {
                0%, 100% { opacity: 0.7; r: 4; }
                50% { opacity: 1; r: 7; }
              }
              @keyframes slowTurnRight {
                0% { transform: rotate(0deg) translate(0px, 0px) scale(1); }
                100% { transform: rotate(-3deg) translate(-30px, 20px) scale(1.03); }
              }
              @keyframes driftLeft {
                0% { transform: translate(0px, 0px) rotate(0deg); }
                100% { transform: translate(15px, -15px) rotate(1deg); }
              }
              @keyframes panBridge {
                0% { opacity: 0.1; }
                50% { opacity: 0.4; }
                100% { opacity: 0.1; }
              }
              
              .animated-path {
                stroke-dasharray: 3000;
                stroke-dashoffset: 3000;
                animation: drawLine 5s ease-out forwards;
              }
              
              .delay-1 { animation-delay: 0.5s; }
              .delay-2 { animation-delay: 1.5s; }
              .delay-3 { animation-delay: 2.5s; }
              .delay-4 { animation-delay: 3.5s; }

              .right-cluster {
                transform-origin: 1600px 540px;
                animation: slowTurnRight 18s infinite alternate ease-in-out;
              }
              
              .left-cluster {
                transform-origin: 300px 300px;
                animation: driftLeft 20s infinite alternate ease-in-out;
              }

              .node-pulse { animation: pulseGlow 4s infinite ease-in-out; }
              .node-intense { animation: pulseIntense 3s infinite ease-in-out; fill: ${accentGlow}; }
              
              .faint-poly {
                opacity: 0;
                animation: fadeIn 6s ease-in forwards;
                animation-delay: 2s;
              }
              
              .bridge-line {
                animation: panBridge 8s infinite alternate ease-in-out;
              }
            `}
          </style>
        </defs>

        {/* ==================== LEFT CLUSTER (Less Intricate) ==================== */}
        <g className='left-cluster'>
          {/* Faint Polygons */}
          <polygon
            points='100,50 400,150 250,350'
            fill={secondaryColor}
            className='faint-poly'
            style={{ opacity: 0.03 }}
          />
          <polygon
            points='250,350 400,150 600,450'
            fill={primaryColor}
            className='faint-poly'
            style={{ opacity: 0.02 }}
          />

          {/* Lines */}
          <g
            stroke={primaryColor}
            strokeWidth='1'
            fill='none'
            style={{ opacity: 0.6 }}
          >
            <path
              className='animated-path delay-1'
              d='M -50 150 L 100 50 L 400 150 L 600 450'
            />
            <path
              className='animated-path delay-2'
              d='M 100 50 L 250 350 L 400 150'
            />
            <path
              className='animated-path delay-3'
              d='M -100 400 L 250 350 L 300 600'
            />
            <path className='animated-path delay-4' d='M 250 350 L 600 450' />
          </g>

          {/* Left Nodes */}
          <g fill={primaryColor} filter='url(#glow)'>
            <circle
              cx='100'
              cy='50'
              className='node-pulse'
              style={{ animationDelay: '0.2s' }}
            />
            <circle
              cx='400'
              cy='150'
              className='node-pulse'
              style={{ animationDelay: '1.1s' }}
            />
            <circle
              cx='250'
              cy='350'
              className='node-pulse'
              style={{ animationDelay: '0.7s' }}
            />
            <circle
              cx='600'
              cy='450'
              className='node-intense'
              filter='url(#intense-glow)'
              style={{ animationDelay: '1.5s' }}
            />
            <circle
              cx='300'
              cy='600'
              className='node-pulse'
              style={{ animationDelay: '2.0s' }}
            />
          </g>
        </g>

        {/* ==================== BRIDGING SYSTEM ==================== */}
        {/* Long, sweeping lines connecting the left structure to the right structure */}
        <g
          stroke={secondaryColor}
          strokeWidth='0.75'
          fill='none'
          className='bridge-line'
          strokeDasharray='10 15'
        >
          <path
            className='animated-path delay-3'
            d='M 600 450 Q 1000 300 1300 150'
          />
          <path
            className='animated-path delay-4'
            d='M 400 150 Q 900 600 1100 650'
          />
          <path
            className='animated-path delay-4'
            d='M 300 600 Q 800 900 1400 1050'
          />
        </g>

        {/* ==================== RIGHT CLUSTER (Expanded & Show-y) ==================== */}
        <g className='right-cluster'>
          {/* Faint background polygons */}
          <polygon
            points='1300,150 1700,50 1650,450'
            fill={secondaryColor}
            className='faint-poly'
            style={{ opacity: 0.05 }}
          />
          <polygon
            points='1650,450 1850,350 1550,750 1100,650'
            fill={primaryColor}
            className='faint-poly'
            style={{ opacity: 0.04 }}
          />
          <polygon
            points='1100,650 1550,750 1400,1050 850,950'
            fill={secondaryColor}
            className='faint-poly'
            style={{ opacity: 0.03 }}
          />
          {/* New Polygons for expansion */}
          <polygon
            points='1850,350 2050,600 1750,900 1550,750'
            fill={primaryColor}
            className='faint-poly'
            style={{ opacity: 0.02 }}
          />
          <polygon
            points='1400,1050 1750,900 1500,1200'
            fill={secondaryColor}
            className='faint-poly'
            style={{ opacity: 0.03 }}
          />

          {/* Dotted Inner Connections */}
          <path
            d='M 1300 150 L 1650 450 M 1100 650 L 1400 1050 M 1650 450 L 1100 650 M 1550 750 L 1750 900'
            stroke={secondaryColor}
            strokeWidth='1.5'
            strokeDasharray='2 6'
            fill='none'
            style={{ opacity: 0.5 }}
          />

          {/* Solid Animated Lines */}
          <g stroke={primaryColor} strokeWidth='1.5' fill='none'>
            {/* Top Right Web */}
            <path
              className='animated-path'
              d='M 1950 -50 L 1300 150 L 1700 50 L 1850 350 Z'
            />
            <path
              className='animated-path delay-1'
              d='M 1300 150 L 1650 450 L 1850 350'
            />

            {/* Middle connecting structure */}
            <path
              className='animated-path delay-1'
              d='M 1650 450 L 1550 750 L 1850 350'
            />
            <path className='animated-path delay-2' d='M 1100 650 L 1650 450' />
            <path
              className='animated-path delay-2'
              d='M 1100 650 L 1550 750 L 1400 1050'
            />

            {/* Bottom Left Web */}
            <path
              className='animated-path delay-3'
              d='M 1100 650 L 850 950 L 1400 1050 Z'
            />
            <path
              className='animated-path delay-3'
              d='M 850 950 L 700 1150 L 1400 1050'
            />

            {/* NEW: Extended Right Edge Web */}
            <path
              className='animated-path delay-2'
              d='M 1850 350 L 2050 600 L 1750 900 L 1550 750'
            />
            <path
              className='animated-path delay-4'
              d='M 1550 750 L 1750 900 L 1400 1050'
            />
            <path
              className='animated-path delay-4'
              d='M 1400 1050 L 1500 1200 L 1750 900'
            />
          </g>

          {/* Glowing Nodes */}
          <g fill={primaryColor} filter='url(#glow)'>
            <circle
              cx='1300'
              cy='150'
              className='node-intense'
              filter='url(#intense-glow)'
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
              className='node-intense'
              filter='url(#intense-glow)'
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

            {/* NEW: Extended Right Edge Nodes */}
            <circle
              cx='2050'
              cy='600'
              className='node-pulse'
              style={{ animationDelay: '0.9s' }}
            />
            <circle
              cx='1750'
              cy='900'
              className='node-intense'
              filter='url(#intense-glow)'
              style={{ animationDelay: '2.5s' }}
            />
            <circle
              cx='1500'
              cy='1200'
              className='node-pulse'
              style={{ animationDelay: '1.8s' }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
