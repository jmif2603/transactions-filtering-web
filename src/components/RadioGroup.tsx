import RadioButton from './RadioButton';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroup = ({
  options,
  value,
  onChange,
  disabled = false,
}: RadioGroupProps) => {
  const colors = {
    textDark: '#0f2b4d',
    textDisabled: '#b8c0ca',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map((option) => {
        const isDisabled = disabled || option.disabled;
        const isSelected = value === option.value;

        return (
          <div
            key={option.value}
            onClick={() => !isDisabled && onChange?.(option.value)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            <RadioButton
              selected={isSelected}
              disabled={isDisabled}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                fontWeight: 400,
                lineHeight: '22.5px',
                letterSpacing: -0.15,
                color: isDisabled ? colors.textDisabled : colors.textDark,
              }}
            >
              {option.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;