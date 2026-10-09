const imgIcon16 = 'http://localhost:3845/assets/00e9a2d15873cc38a8e53518f148890632446af3.svg';
const imgIcon12 = 'http://localhost:3845/assets/be0632229cea1d0b28c8620a1ab54cdba489afb0.svg';

type ChipSize = 'Large' | 'Medium' | 'Small' | 'Extra Small';

interface ChipProps {
  label?: string;
  size?: ChipSize;
  leftIcon?: boolean;
  rightIcon?: boolean;
  icon?: React.ReactNode | null;
  selected?: boolean;
  onClick?: () => void;
}

const verticalPadding: Record<ChipSize, number> = {
  'Large': 8,
  'Medium': 6,
  'Small': 4,
  'Extra Small': 2,
};

const Chip = ({ label = 'Spending Category', size = 'Large', leftIcon = false, rightIcon = false, icon = null, selected = false, onClick }: ChipProps) => {
  const iconSize = size === 'Extra Small' ? 12 : 16;
  const iconSrc = size === 'Extra Small' ? imgIcon12 : imgIcon16;

  const renderIcon = () => {
    const el = icon || (
      <img
        alt=""
        src={iconSrc}
        style={{ display: 'block', width: iconSize, height: iconSize, flexShrink: 0 }}
      />
    );
    return selected
      ? <span style={{ display: 'flex', filter: 'brightness(0) invert(1)' }}>{el}</span>
      : el;
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        backgroundColor: selected ? 'rgba(30,119,132,0.7)' : 'white',
        border: `1px solid ${selected ? '#1d7883' : '#cfd6de'}`,
        borderRadius: 100,
        paddingTop: verticalPadding[size],
        paddingBottom: verticalPadding[size],
        paddingLeft: 16,
        paddingRight: 16,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {leftIcon && renderIcon()}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          color: selected ? 'white' : '#60758f',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      {rightIcon && renderIcon()}
    </div>
  );
};

export default Chip;
