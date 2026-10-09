import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

// Icon components for default icons
const ArrowLeftIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <path d="M6.5 1.5L3 5L6.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <path d="M3.5 1.5L7 5L3.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'danger';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'fill',
      size = 'medium',
      color = 'primary',
      startIcon,
      endIcon,
      children = 'Button',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = [
      'inline-flex items-center justify-center',
      'font-normal text-center whitespace-nowrap',
      'rounded-[6px] border-solid',
      'transition-colors duration-150',
      'focus:outline-none',
      "font-['Inter',sans-serif]",
    ];

    // Size styles
    const sizeStyles: Record<ButtonSize, string> = {
      small: 'gap-1 px-3 py-1 text-[13px] leading-[19.5px]',
      medium: 'gap-1 px-3 py-2 text-[15px] leading-[21px] tracking-[-0.15px]',
      large: 'gap-2 px-6 py-3 text-[15px] leading-[21px] tracking-[-0.15px]',
    };

    // Variant + Color styles
    const getVariantStyles = () => {
      if (disabled) {
        switch (variant) {
          case 'fill':
            return 'bg-[#e2e6eb] border-2 border-[#e2e6eb] text-[#60758f] cursor-not-allowed';
          case 'outline':
            return 'bg-white border border-[#e2e6eb] text-[#b8c0ca] cursor-not-allowed';
          case 'text':
            return 'border-0 text-[#b8c0ca] cursor-not-allowed';
        }
      }

      if (color === 'primary') {
        switch (variant) {
          case 'fill':
            return [
              'bg-[#1d7883] border-2 border-[#1d7883] text-white',
              'hover:bg-[#1e5d67] hover:border-[#1e5d67]',
              'focus:border-[#1c4b55]',
            ].join(' ');
          case 'outline':
            return [
              'bg-white border border-[#cfd6de] text-[#0f2b4d]',
              'hover:border-[#60758f]',
              'focus:border-[#1c4b55]',
            ].join(' ');
          case 'text':
            return [
              'border-0 text-[#1d7883]',
              'hover:text-[#1e5d67]',
              'focus:text-[#0f2b4d]',
            ].join(' ');
        }
      }

      // Danger color
      switch (variant) {
        case 'fill':
          return [
            'bg-[#dc3545] border-2 border-[#dc3545] text-white',
            'hover:bg-[#bf2e3c] hover:border-[#bf2e3c]',
            'focus:border-[#bf2e3c]',
          ].join(' ');
        case 'outline':
          return [
            'bg-white border border-[#dc3545] text-[#dc3545]',
            'hover:bg-[#bf2e3c] hover:border-[#bf2e3c] hover:text-white',
            'focus:border-[#bf2e3c]',
          ].join(' ');
        case 'text':
          return [
            'border-0 text-[#dc3545]',
            'hover:text-[#bf2e3c]',
            'focus:text-[#bf2e3c]',
          ].join(' ');
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          ...baseStyles,
          sizeStyles[size],
          getVariantStyles(),
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {startIcon && (
          <span className="flex items-center justify-center w-4 h-4 shrink-0">
            {startIcon === true ? <ArrowLeftIcon /> : startIcon}
          </span>
        )}
        <span>{children}</span>
        {endIcon && (
          <span className="flex items-center justify-center w-4 h-4 shrink-0">
            {endIcon === true ? <ArrowRightIcon /> : endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

// Usage examples:
// <Button>Default Button</Button>
// <Button variant="outline" color="primary">Outline Primary</Button>
// <Button variant="text" color="danger">Text Danger</Button>
// <Button size="large" startIcon={<MyIcon />}>With Start Icon</Button>
// <Button size="small" endIcon={true}>With Arrow</Button>
// <Button disabled>Disabled</Button>