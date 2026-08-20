import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'metallic' | 'black' | 'white' | 'outline' | 'berry';
  showText?: boolean;
  textClassName?: string;
  size?: number;
}

export const TripleMoonLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'metallic',
  showText = false,
  textClassName = '',
  size = 40
}) => {
  const gradientId = React.useId();

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size * 0.55}
        viewBox="0 0 120 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-300"
      >
        <defs>
          {/* Metallic Copper Brush Gradient */}
          <linearGradient id={`${gradientId}-copper`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C4A21" />
            <stop offset="30%" stopColor="#D89668" />
            <stop offset="50%" stopColor="#F5D3B3" />
            <stop offset="70%" stopColor="#B87333" />
            <stop offset="100%" stopColor="#5E2B0C" />
          </linearGradient>

          {/* Berry Gradient */}
          <linearGradient id={`${gradientId}-berry`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#92003A" />
            <stop offset="100%" stopColor="#F62477" />
          </linearGradient>

          {/* Radial Metallic Shine for Full Moon */}
          <radialGradient id={`${gradientId}-radial`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDF2E9" />
            <stop offset="40%" stopColor="#D89668" />
            <stop offset="85%" stopColor="#B87333" />
            <stop offset="100%" stopColor="#6E3A14" />
          </radialGradient>
        </defs>

        {variant === 'outline' ? (
          <g stroke="currentColor" strokeWidth="2.5" fill="none">
            {/* Left Waxing Crescent */}
            <path d="M 38 6 C 18 18 18 48 38 60 C 26 50 26 16 38 6 Z" />
            {/* Full Moon */}
            <circle cx="60" cy="33" r="23" />
            {/* Right Waning Crescent */}
            <path d="M 82 6 C 102 18 102 48 82 60 C 94 50 94 16 82 6 Z" />
          </g>
        ) : (
          <g
            fill={
              variant === 'metallic'
                ? `url(#${gradientId}-copper)`
                : variant === 'berry'
                ? `url(#${gradientId}-berry)`
                : variant === 'white'
                ? '#FFFFFF'
                : '#0A0A0A'
            }
          >
            {/* Left Waxing Crescent */}
            <path d="M 38 4 C 15 16 15 50 38 62 C 24 50 24 16 38 4 Z" />

            {/* Middle Full Moon Circle with subtle metallic gradient in metallic mode */}
            <circle
              cx="60"
              cy="33"
              r="24"
              fill={
                variant === 'metallic'
                  ? `url(#${gradientId}-radial)`
                  : variant === 'berry'
                  ? `url(#${gradientId}-berry)`
                  : variant === 'white'
                  ? '#FFFFFF'
                  : '#0A0A0A'
              }
            />

            {/* Right Waning Crescent */}
            <path d="M 82 4 C 105 16 105 50 82 62 C 96 50 96 16 82 4 Z" />
          </g>
        )}
      </svg>

      {showText && (
        <div className={`flex flex-col leading-none tracking-widest ${textClassName}`}>
          <span className="font-serif-chic font-bold text-lg md:text-xl uppercase tracking-[0.2em]">
            3 Lunas
          </span>
          <span className="text-[9px] md:text-[10px] font-sans-body uppercase tracking-[0.35em] opacity-80 mt-0.5">
            Boutique
          </span>
        </div>
      )}
    </div>
  );
};
