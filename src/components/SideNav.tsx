import Button from './Button';
import {
  IconWallet,
  IconInvest,
  IconReceiptSmall,
  IconCreditCard,
  IconUser,
  IconHelpCircle,
  IconBell,
  IconDollarSign,
  IconSearch,
  IconMembers,
  IconBenefits,
  IconReports,
  IconSettings,
  IconOrganizations,
  IconBanking,
  IconIdentity,
  IconBenefitBuilder,
  IconHome,
} from './icons';

// ============ Colors ============

const colors = {
  textDark: '#0f2b4d',
  textMuted: '#60758f',
  primary: '#1d7883',
  bg: '#ffffff',
  border: '#f7f3f2',
};

// ============ Globe icon (language toggle) ============

const GlobeIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="6.5" />
    <ellipse cx="8" cy="8" rx="2.5" ry="6.5" />
    <line x1="1.5" y1="8" x2="14.5" y2="8" />
  </svg>
);

// ============ SideNavItem ============

interface SideNavItemProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const SideNavItem = ({ label, icon, active = false, onClick }: SideNavItemProps) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      padding: '12px 0',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
    }}
  >
    {icon && (
      <span
        style={{
          color: active ? colors.primary : colors.textMuted,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          width: 16,
          height: 16,
        }}
      >
        {icon}
      </span>
    )}
    <span
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 15,
        fontWeight: active ? 500 : 400,
        lineHeight: '22.5px',
        color: active ? colors.textDark : colors.textMuted,
      }}
    >
      {label}
    </span>
  </button>
);

// ============ Nav item type ============

export interface SideNavNavItem {
  label: string;
  icon?: React.ReactNode;
}

// ============ Pre-built nav item sets ============

export const healthWalletNavItemsEn: SideNavNavItem[] = [
  { label: 'Wallet',        icon: <IconWallet size={16} /> },
  { label: 'Investments',   icon: <IconInvest size={16} /> },
  { label: 'Claims',        icon: <IconReceiptSmall size={16} /> },
  { label: 'Cards',         icon: <IconCreditCard size={16} /> },
  { label: 'Profile',       icon: <IconUser size={16} /> },
  { label: 'Support',       icon: <IconHelpCircle size={16} /> },
  { label: 'Notifications', icon: <IconBell size={16} /> },
];

export const healthWalletNavItemsEs: SideNavNavItem[] = [
  { label: 'Cuenta',         icon: <IconWallet size={16} /> },
  { label: 'Inversiones',    icon: <IconInvest size={16} /> },
  { label: 'Reclamaciones',  icon: <IconReceiptSmall size={16} /> },
  { label: 'Tarjetas',       icon: <IconCreditCard size={16} /> },
  { label: 'Perfil',         icon: <IconUser size={16} /> },
  { label: 'Ayuda',          icon: <IconHelpCircle size={16} /> },
  { label: 'Notificaciones', icon: <IconBell size={16} /> },
];

export const healthWalletManagerNavItemsA: SideNavNavItem[] = [
  { label: 'Members',       icon: <IconMembers size={16} /> },
  { label: 'Benefits',      icon: <IconBenefits size={16} /> },
  { label: 'Contributions', icon: <IconDollarSign size={16} /> },
  { label: 'Reports',       icon: <IconReports size={16} /> },
  { label: 'Claims',        icon: <IconReceiptSmall size={16} /> },
  { label: 'Settings',      icon: <IconSettings size={16} /> },
  { label: 'Resources',     icon: <IconHelpCircle size={16} /> },
];

export const healthWalletManagerNavItemsB: SideNavNavItem[] = [
  { label: 'Home',            icon: <IconHome size={16} /> },
  { label: 'Organizations',   icon: <IconOrganizations size={16} /> },
  { label: 'Member Search',   icon: <IconSearch size={16} /> },
  { label: 'Banking',         icon: <IconBanking size={16} /> },
  { label: 'Identity',        icon: <IconIdentity size={16} /> },
  { label: 'Reports',         icon: <IconReports size={16} /> },
  { label: 'Claims',          icon: <IconReceiptSmall size={16} /> },
  { label: 'Benefit Builder', icon: <IconBenefitBuilder size={16} /> },
  { label: 'Settings',        icon: <IconSettings size={16} /> },
  { label: 'Resources',       icon: <IconHelpCircle size={16} /> },
];

// ============ SideNav ============

interface SideNavProps {
  logo: React.ReactNode;
  navItems: SideNavNavItem[];
  activeItem?: string;
  locale?: 'en' | 'es';          // if provided, shows language toggle in footer
  logOutLabel?: string;
  onNavItemClick?: (label: string) => void;
  onLogOut?: () => void;
  onLanguageToggle?: () => void;
  style?: React.CSSProperties;
}

const SideNav = ({
  logo,
  navItems,
  activeItem,
  locale,
  logOutLabel = 'Log Out',
  onNavItemClick,
  onLogOut,
  onLanguageToggle,
  style,
}: SideNavProps) => {
  const languageToggleLabel = locale === 'en' ? 'Español' : 'English';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 212,
        height: '100%',
        backgroundColor: colors.bg,
        paddingLeft: 24,
        paddingRight: 24,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          flexShrink: 0,
        }}
      >
        {logo}
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: colors.border, flexShrink: 0 }} />

      {/* Nav items */}
      <nav style={{ flex: 1, paddingTop: 8, overflowY: 'auto' }}>
        {navItems.map((item) => (
          <SideNavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={item.label === activeItem}
            onClick={() => onNavItemClick?.(item.label)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          flexShrink: 0,
          paddingBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {locale && (
          <button
            onClick={onLanguageToggle}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              color: colors.primary,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 400,
            }}
          >
            <GlobeIcon />
            {languageToggleLabel}
          </button>
        )}
        <Button
          variant="outline"
          size="medium"
          style={{ width: '100%' }}
          onClick={onLogOut}
        >
          {logOutLabel}
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
