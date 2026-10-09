interface SelectedFilterAProps {
  groupLabel?: string;
  selectedValues: string[];
  onClear?: () => void;
  backgroundColor?: string;
}

const SelectedFilterA = ({
  groupLabel = 'Benefit',
  selectedValues,
  onClear,
  backgroundColor = '#f9f7f6',
}: SelectedFilterAProps) => {
  const displayText = (() => {
    if (selectedValues.length === 0) return '';
    if (selectedValues.length === 1) return selectedValues[0];
    if (selectedValues.length === 2) return `${selectedValues[0]}, ${selectedValues[1]}`;
    const overflow = selectedValues.length - 2;
    return `${selectedValues[0]}, ${selectedValues[1]}, +${overflow}`;
  })();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        backgroundColor,
        border: '1px solid #cfd6de',
        borderRadius: 6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            fontWeight: 400,
            color: '#60758f',
            letterSpacing: -0.15,
            whiteSpace: 'nowrap',
          }}
        >
          {groupLabel}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            fontWeight: 400,
            color: '#0f2b4d',
            letterSpacing: -0.15,
            whiteSpace: 'nowrap',
          }}
        >
          &nbsp;{displayText}
        </span>
      </div>

      <button
        onClick={onClear}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          flexShrink: 0,
          padding: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="#60758f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default SelectedFilterA;
