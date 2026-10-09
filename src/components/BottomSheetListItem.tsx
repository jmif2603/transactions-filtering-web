interface BottomSheetListItemProps {
  /** The main label text */
  label: string;
  /** Optional subtext below the label */
  subText?: string;
  /** Whether this item is selected */
  isSelected?: boolean;
  /** Whether this is the last item in the list (removes bottom border) */
  isEndOfList?: boolean;
  /** Click handler */
  onClick?: () => void;
}

const BottomSheetListItem = ({
  label,
  subText,
  isSelected = false,
  isEndOfList = false,
  onClick,
}: BottomSheetListItemProps) => {
  // Colors from Figma design tokens
  const colors = {
    primary: '#1d7883',
    white: '#ffffff',
    textDark: '#0f2b4d',
    textMuted: '#60758f',
    textDisabled: '#b8c0ca',
    textLink: '#1d7883',
    borderDark: '#cfd6de',
  };

  const hasSubText = Boolean(subText);

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '0 20px',
        width: '100%',
        backgroundColor: isSelected ? colors.primary : colors.white,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: hasSubText ? '14.5px 0' : '0',
          minHeight: hasSubText ? undefined : 52,
          borderBottom: isEndOfList ? 'none' : `1px solid ${colors.borderDark}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: hasSubText ? 4 : 0,
            paddingLeft: 12,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* Main Label */}
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              fontWeight: isSelected ? 500 : 400,
              lineHeight: '22.5px',
              letterSpacing: -0.15,
              color: isSelected
                ? colors.white
                : hasSubText
                ? colors.textDark
                : colors.textLink,
              whiteSpace: hasSubText ? 'normal' : 'nowrap',
            }}
          >
            {label}
          </span>

          {/* Subtext (if provided) */}
          {hasSubText && (
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                fontWeight: 400,
                lineHeight: '22.5px',
                letterSpacing: -0.15,
                color: isSelected ? colors.textDisabled : colors.textMuted,
              }}
            >
              {subText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomSheetListItem;

// Usage examples:
// Single label (unselected):
// <BottomSheetListItem label="Item Label" />
//
// Single label (selected):
// <BottomSheetListItem label="Item Label" isSelected />
//
// With subtext (unselected):
// <BottomSheetListItem label="Item Label" subText="Item subtext description" />
//
// With subtext (selected):
// <BottomSheetListItem label="Item Label" subText="Item subtext description" isSelected />
//
// End of list (no bottom border):
// <BottomSheetListItem label="Item Label" isEndOfList />