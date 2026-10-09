import React from 'react';

type TabType = 'wallet' | 'cards' | 'invest' | 'account' | 'claims' | 'resources';

interface MobileBottomNavTabProps {
  tab: TabType;
  inFocus?: boolean;
  redDot?: boolean;
  onClick?: () => void;
}

const MobileBottomNavTab = ({
  tab,
  inFocus = false,
  redDot = false,
  onClick,
}: MobileBottomNavTabProps) => {
  // Colors from Figma design tokens
  const colors = {
    active: '#0f2b4d',
    inactive: '#60758f',
    redDot: '#e53935',
  };

  const textColor = inFocus ? colors.active : colors.inactive;
  const iconColor = inFocus ? colors.active : colors.inactive;

  // Icon components for each tab
  const icons: Record<TabType, { outline: React.ReactNode; filled: React.ReactNode }> = {
    wallet: {
      outline: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M16 12h.01" />
          <path d="M2 10h20" />
        </svg>
      ),
      filled: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
          <path d="M4 5C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5H4ZM16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z" />
        </svg>
      ),
    },
    cards: {
      outline: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
      filled: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
          <path fillRule="evenodd" d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V9H2V7ZM2 11V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V11H2Z" />
        </svg>
      ),
    },
    invest: {
      outline: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 5-5" />
          <path d="M16 9h4v4" />
        </svg>
      ),
      filled: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
          <path d="M3 3C3.55228 3 4 3.44772 4 4V19C4 19.5523 4.44772 20 5 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H5C3.34315 22 2 20.6569 2 19V4C2 3.44772 2.44772 3 3 3Z" />
          <path d="M15.2929 8.29289C15.6834 7.90237 16.3166 7.90237 16.7071 8.29289L20.7071 12.2929C21.0976 12.6834 21.0976 13.3166 20.7071 13.7071C20.3166 14.0976 19.6834 14.0976 19.2929 13.7071L16 10.4142L12.7071 13.7071C12.3166 14.0976 11.6834 14.0976 11.2929 13.7071L8 10.4142L5.70711 12.7071C5.31658 13.0976 4.68342 13.0976 4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L7.29289 8.29289C7.68342 7.90237 8.31658 7.90237 8.70711 8.29289L12 11.5858L15.2929 8.29289Z" />
        </svg>
      ),
    },
    account: {
      outline: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" />
        </svg>
      ),
      filled: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
          <circle cx="12" cy="8" r="5" />
          <path d="M4 20c0-4.5 4-7 8-7s8 2.5 8 7H4Z" />
        </svg>
      ),
    },
    claims: {
      outline: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v16l4-2 4 2 4-2 4 2V4l-4 2-4-2-4 2-4-2z" />
          <path d="M8 10h8" />
          <path d="M8 14h5" />
        </svg>
      ),
      filled: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
          <path d="M4 2L8 4L12 2L16 4L20 2V20L16 18L12 20L8 18L4 20V2ZM8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11H16C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9H8ZM7 14C7 13.4477 7.44772 13 8 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H8C7.44772 15 7 14.5523 7 14Z" />
        </svg>
      ),
    },
    resources: {
      outline: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4" />
          <circle cx="12" cy="17" r="0.5" fill={iconColor} />
        </svg>
      ),
      filled: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1.5-5.5c-.83.83-1.5 1.5-1.5 2.5h-2c0-1.8 1.2-2.9 2-3.7.8-.8 1-1.2 1-1.8 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.2-.5 2-1.5 3z" />
        </svg>
      ),
    },
  };

  const labels: Record<TabType, string> = {
    wallet: 'Wallet',
    cards: 'Cards',
    invest: 'Invest',
    account: 'Account',
    claims: 'Claims',
    resources: 'Resources',
  };

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        width: 65,
        height: 56,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        padding: 0,
      }}
    >
      {/* Red notification dot */}
      {redDot && (
        <div
          style={{
            position: 'absolute',
            top: 2.5,
            right: 12,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: colors.redDot,
          }}
        />
      )}

      {/* Icon */}
      {inFocus ? icons[tab].filled : icons[tab].outline}

      {/* Label */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 500,
          lineHeight: '15px',
          color: textColor,
          whiteSpace: 'nowrap',
        }}
      >
        {labels[tab]}
      </span>
    </button>
  );
};

export default MobileBottomNavTab;