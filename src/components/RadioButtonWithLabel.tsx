import RadioButton from './RadioButton';

interface RadioButtonWithLabelProps {
  selected?: boolean;
  disabled?: boolean;
  label?: string;
  onPress?: () => void;
}

const RadioButtonWithLabel = ({
  selected = false,
  disabled = false,
  label = 'Description Here',
  onPress,
}: RadioButtonWithLabelProps) => {
  const handleClick = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  // Colors from Figma design tokens
  const colors = {
    textDark: '#0f2b4d',
    textMuted: '#60758f',
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <RadioButton
        selected={selected}
        disabled={disabled}
      />
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 15,
          fontWeight: 400,
          lineHeight: '22.5px',
          letterSpacing: -0.15,
          color: disabled ? colors.textMuted : colors.textDark,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default RadioButtonWithLabel;