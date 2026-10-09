import { forwardRef, useId } from 'react';
import Input from './Input';
import type { InputProps } from './Input';

export type TextFieldVariant = 'outlined' | 'underlined';
export type TextFieldState = 'default' | 'hover' | 'focus' | 'filled' | 'invalid' | 'valid' | 'disabled';

export interface TextFieldProps extends Omit<InputProps, 'variant'> {
  /** Visual style variant */
  variant?: TextFieldVariant;
  /** Label text */
  label?: string;
  /** Whether to show the label */
  labelVisible?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (shows when error is true) */
  errorMessage?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = 'outlined',
      label = 'Label',
      labelVisible = true,
      required = false,
      helperText,
      errorMessage,
      error = false,
      disabled = false,
      className,
      id,
      ...inputProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Map TextField variant to Input variant
    const inputVariant = variant === 'outlined' ? 'outline' : 'underline';

    // Label styles based on variant
    const labelStyles =
      variant === 'outlined'
        ? [
            "font-['Inter',sans-serif] font-normal",
            'text-[15px] leading-[22.5px]',
            'text-[#0f2b4d]',
            disabled && 'text-[#60758f]',
          ]
        : [
            "font-['Inter',sans-serif] font-medium",
            'text-[10px] leading-[15px] tracking-[0.8px] uppercase',
            'text-[#60758f]',
            disabled && 'opacity-60',
          ];

    // Helper/error text styles
    const helperStyles = [
      "font-['Inter',sans-serif] font-normal",
      'text-[13px] leading-[19.5px]',
      error ? 'text-[#dc3545]' : 'text-[#60758f]',
    ];

    return (
      <div className={['flex flex-col gap-2 w-full', className].filter(Boolean).join(' ')}>
        {/* Label */}
        {labelVisible && (
          <label
            htmlFor={inputId}
            className={['flex items-center gap-1 whitespace-nowrap', ...labelStyles]
              .filter(Boolean)
              .join(' ')}
          >
            <span>{label}</span>
            {required && <span>*</span>}
          </label>
        )}

        {/* Input */}
        <Input
          ref={ref}
          id={inputId}
          variant={inputVariant}
          error={error}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={helperText || errorMessage ? `${inputId}-helper` : undefined}
          {...inputProps}
        />

        {/* Helper text or error message */}
        {(helperText || (error && errorMessage)) && (
          <p
            id={`${inputId}-helper`}
            className={helperStyles.filter(Boolean).join(' ')}
          >
            {error && errorMessage ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;

// Usage examples:
// <TextField label="Email" placeholder="Enter your email" />
// <TextField variant="underlined" label="Name" placeholder="Enter your name" />
// <TextField label="Password" required placeholder="Required field" />
// <TextField label="Username" error errorMessage="Username is taken" />
// <TextField label="Bio" helperText="Max 200 characters" />
// <TextField label="Disabled" disabled placeholder="Cannot edit" />