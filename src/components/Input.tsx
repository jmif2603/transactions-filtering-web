import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputVariant = 'outline' | 'underline';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual style variant */
  variant?: InputVariant;
  /** Icon or element to display at the start */
  startIcon?: ReactNode;
  /** Icon or element to display at the end */
  endIcon?: ReactNode;
  /** Error state */
  error?: boolean;
  /** Additional class name for the container */
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outline',
      startIcon,
      endIcon,
      error = false,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    // Container styles based on variant
    const containerStyles = [
      'flex items-center gap-2 w-full',
      'border-solid border-[#cfd6de]',
      'transition-colors duration-150',
      // Variant-specific styles
      variant === 'outline'
        ? 'bg-white border rounded-[6px] h-[39px] px-4 py-2'
        : 'bg-transparent border-b pr-2 py-4',
      // Focus-within state
      'focus-within:border-[#1d7883]',
      // Error state
      error && 'border-[#dc3545] focus-within:border-[#dc3545]',
      // Disabled state
      disabled && 'bg-[#f9f7f6] cursor-not-allowed opacity-60',
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // Input styles
    const inputStyles = [
      'flex-1 min-w-0',
      "font-['Inter',sans-serif] font-normal",
      'text-[15px] leading-[22.5px] tracking-[-0.15px]',
      'text-[#0f2b4d] placeholder:text-[#60758f]',
      'bg-transparent outline-none border-none',
      'disabled:cursor-not-allowed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Icon wrapper styles
    const iconStyles = 'flex items-center justify-center w-4 h-4 shrink-0 text-[#60758f]';

    return (
      <div className={containerStyles}>
        {startIcon && <span className={iconStyles}>{startIcon}</span>}
        <input
          ref={ref}
          disabled={disabled}
          className={inputStyles}
          {...props}
        />
        {endIcon && <span className={iconStyles}>{endIcon}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

// Usage examples:
// <Input placeholder="Enter text" />
// <Input variant="underline" placeholder="Underline style" />
// <Input startIcon={<SearchIcon />} placeholder="Search..." />
// <Input endIcon={<SendIcon />} placeholder="Type a message" />
// <Input error placeholder="Error state" />
// <Input disabled placeholder="Disabled" />