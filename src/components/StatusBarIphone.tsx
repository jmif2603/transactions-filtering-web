import React from 'react';

interface StatusBarIphoneProps {
  variant?: 'default' | 'withNavigation';
  pageTitle?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const StatusBarIphone = ({
  variant = 'default',
  pageTitle = 'Page Flow',
  showBackButton = true,
  showCloseButton = true,
  onBackClick,
  onCloseClick,
  leftIcon,
  rightIcon,
}: StatusBarIphoneProps) => {
  const colors = {
    textDark: '#0f2b4d',
    textPrimary: '#000000',
  };

  // Chevron Left Icon
  const ChevronLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );

  // X/Close Icon
  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );

  // Signal Bars Icon
  const SignalIcon = () => (
    <svg width="18" height="12" viewBox="0 0 18 12" fill={colors.textPrimary}>
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2" width="3" height="10" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );

  // WiFi Icon
  const WifiIcon = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill={colors.textPrimary}>
      <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 5c2.5 0 4.5 1.5 5.5 3l-1.5 1c-.7-1-2.2-2-4-2s-3.3 1-4 2L2.5 8C3.5 6.5 5.5 5 8 5zm0-5c4 0 7.5 2 9 4.5L15.5 6C14.2 4 11.3 2.5 8 2.5S1.8 4 .5 6L-1 4.5C.5 2 4 0 8 0z" />
    </svg>
  );

  // Battery Icon
  const BatteryIcon = () => (
    <svg width="27" height="13" viewBox="0 0 27 13" fill={colors.textPrimary}>
      <rect x="0" y="0" width="24" height="13" rx="3" stroke={colors.textPrimary} strokeWidth="1" fill="none" />
      <rect x="2" y="2" width="20" height="9" rx="1.5" fill={colors.textPrimary} />
      <path d="M25 4v5a2 2 0 002-2V6a2 2 0 00-2-2z" fill={colors.textPrimary} opacity="0.4" />
    </svg>
  );

  // Status indicators (signal, wifi, battery)
  const StatusIndicators = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <SignalIcon />
      <WifiIcon />
      <BatteryIcon />
    </div>
  );

  // Time display
  const TimeDisplay = () => (
    <span
      style={{
        fontFamily: 'SF Pro, -apple-system, system-ui, sans-serif',
        fontSize: 17,
        fontWeight: 600,
        color: colors.textPrimary,
        letterSpacing: 0,
      }}
    >
      9:41
    </span>
  );

  if (variant === 'default') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 393,
          height: 54,
          padding: '0 24px',
          backgroundColor: '#f9f7f6',
        }}
      >
        <TimeDisplay />
        <StatusIndicators />
      </div>
    );
  }

  // variant === 'withNavigation'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 393,
        backgroundColor: 'white',
      }}
    >
      {/* Status bar row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 54,
          padding: '0 24px',
        }}
      >
        <TimeDisplay />
        <StatusIndicators />
      </div>

      {/* Navigation row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: 40,
        }}
      >
        {/* Left: Back button */}
        <div style={{ width: 24, display: 'flex', justifyContent: 'flex-start' }}>
          {showBackButton && (
            <button
              onClick={onBackClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {leftIcon || <ChevronLeftIcon />}
            </button>
          )}
        </div>

        {/* Center: Page title */}
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 18,
            fontWeight: 500,
            color: colors.textDark,
            letterSpacing: -0.18,
            whiteSpace: 'nowrap',
          }}
        >
          {pageTitle}
        </span>

        {/* Right: Close button */}
        <div style={{ width: 24, display: 'flex', justifyContent: 'flex-end' }}>
          {showCloseButton && (
            <button
              onClick={onCloseClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {rightIcon || <CloseIcon />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBarIphone;