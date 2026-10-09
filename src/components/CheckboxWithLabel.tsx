import Checkbox from './Checkbox';

interface CheckboxWithLabelProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const CheckboxWithLabel = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  label = 'Description Here',
  onChange,
}: CheckboxWithLabelProps) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  // Colors from Figma design tokens
  const colors = {
    textDark: '#0f2b4d',
    textDisabled: '#b8c0ca',
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
      />
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '22.5px',
          letterSpacing: '-0.15px',
          color: disabled ? colors.textDisabled : colors.textDark,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default CheckboxWithLabel;