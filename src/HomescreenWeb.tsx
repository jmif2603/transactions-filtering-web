import { useState, useEffect, useRef } from 'react';
import healthWalletLogoSvg from './assets/HealthWalletLogo.svg';
import SideNav, { healthWalletNavItemsEn, healthWalletNavItemsEs } from './components/SideNav';
import WalletTransactionListItemWeb from './components/WalletTransactionListItemWeb';
import Button from './components/Button';
import BenefitIconDuo from './components/BenefitIconDuo';
import { IconArrowRight, IconChevronRight, IconPlus, IconHelpCircle, IconCalendar } from './components/icons';
import Input from './components/Input';
import CommsIcon from './components/commsIcon';
import CheckboxWithLabel from './components/CheckboxWithLabel';
import RadioButtonWithLabel from './components/RadioButtonWithLabel';
import DateRangeCustomRange from './DateRangeCustomRange';
import { clearedTransactions, pendingTransactions } from './data/transactions';
import type { Transaction } from './data/transactions';

// ============ Colors ============

const colors = {
  textDark: '#0f2b4d',
  textMuted: '#60758f',
  primary: '#1d7883',
  bg: '#f9f7f6',
  white: '#ffffff',
  border: '#f7f3f2',
  borderDark: '#cfd6de',
};

// ============ Local helpers ============

const ChevronDown = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const IconX = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

// ============ FilterDropdown ============

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  isOpen: boolean;
  onToggle: () => void;
  onToggleOption: (option: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

const FilterDropdown = ({ label, options, selected, isOpen, onToggle, onToggleOption, onClearAll, onClose }: FilterDropdownProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasSelection = selected.length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const buttonContent = () => {
    if (!hasSelection) return label;
    const visible = selected.slice(0, 2).join(', ');
    const extra = selected.length - 2;
    return extra > 0 ? `${visible}, +${extra}` : visible;
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: 'white',
          border: `1px solid ${colors.borderDark}`,
          borderRadius: 6,
          paddingLeft: 12,
          paddingRight: hasSelection ? 8 : 12,
          paddingTop: 8,
          paddingBottom: 8,
          height: 40,
          cursor: 'pointer',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 15,
          color: colors.textDark,
          letterSpacing: '-0.15px',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
        }}
      >
        <span>{buttonContent()}</span>
        {hasSelection ? (
          <span
            onClick={(e) => { e.stopPropagation(); onClearAll(); }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, cursor: 'pointer' }}
          >
            <IconX />
          </span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
            <ChevronDown />
          </span>
        )}
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            backgroundColor: 'white',
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            boxShadow: '0px 8px 20px 0px rgba(99,99,102,0.1)',
            padding: 8,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 24 }}>
            {options.map(option => (
              <CheckboxWithLabel
                key={option}
                label={option}
                checked={selected.includes(option)}
                onChange={() => onToggleOption(option)}
              />
            ))}
          </div>
          {selected.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
              <button
                onClick={onClearAll}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 13,
                  color: colors.primary,
                  padding: '4px 12px',
                }}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============ TransactionDateFilter ============

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDateRange = (start: Date, end: Date): string => {
  const sy = start.getFullYear(), ey = end.getFullYear();
  const sm = start.getMonth(), em = end.getMonth();
  const sd = start.getDate(), ed = end.getDate();
  if (sy !== ey) {
    return `${MONTHS_SHORT[sm]} ${sd}, ${sy} - ${MONTHS_SHORT[em]} ${ed}, ${ey}`;
  } else if (sm !== em) {
    return `${MONTHS_SHORT[sm]} ${sd} - ${MONTHS_SHORT[em]} ${ed}, ${sy}`;
  } else {
    return `${MONTHS_SHORT[sm]} ${sd} - ${ed}, ${sy}`;
  }
};

const DATE_RANGE_OPTIONS = [
  { key: 'last24hours', label: 'Last 24 hours' },
  { key: 'last3days',   label: 'Last 3 days' },
  { key: 'last7days',   label: 'Last 7 days' },
  { key: 'last14days',  label: 'Last 14 days' },
  { key: 'last30days',  label: 'Last 30 days' },
];

interface TransactionDateFilterProps {
  selected: string | null;
  savedCustomRange: { startDate: Date | null; endDate: Date | null };
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (key: string) => void;
  onSelectCustomRange: (startDate: Date | null, endDate: Date | null) => void;
  onClearAll: () => void;
  onClose: () => void;
}

const formatDate = (d: Date | null) => d ? `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}` : null;

const TransactionDateFilter = ({ selected, savedCustomRange, isOpen, onToggle, onSelect, onSelectCustomRange, onClearAll, onClose }: TransactionDateFilterProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasSelection = selected !== null;
  const selectedLabel = selected === 'custom'
    ? [formatDate(savedCustomRange.startDate), formatDate(savedCustomRange.endDate)].filter(Boolean).join(' – ')
    : DATE_RANGE_OPTIONS.find(o => o.key === selected)?.label ?? null;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customRange, setCustomRange] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });

  useEffect(() => {
    if (selected === null) setCustomRange({ startDate: null, endDate: null });
  }, [selected]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
        setShowDatePicker(false);
      }
    };
    if (isOpen || showDatePicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, showDatePicker, onClose]);

  useEffect(() => {
    if (!isOpen) setShowDatePicker(false);
  }, [isOpen]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: 'white',
          border: `1px solid ${colors.borderDark}`,
          borderRadius: 6,
          paddingLeft: 12,
          paddingRight: hasSelection ? 8 : 12,
          paddingTop: 8,
          paddingBottom: 8,
          height: 40,
          cursor: 'pointer',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 15,
          color: colors.textDark,
          letterSpacing: '-0.15px',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
        }}
      >
        <span>{selectedLabel ?? 'Transaction Date'}</span>
        {hasSelection ? (
          <span
            onClick={(e) => { e.stopPropagation(); onClearAll(); }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, cursor: 'pointer' }}
          >
            <IconX />
          </span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
            <ChevronDown />
          </span>
        )}
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            width: 220,
            backgroundColor: 'white',
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            boxShadow: '0px 8px 20px 0px rgba(99,99,102,0.1)',
            padding: 8,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingRight: 24 }}>
            {DATE_RANGE_OPTIONS.map(({ key, label }) => (
              <RadioButtonWithLabel
                key={key}
                label={label}
                selected={selected === key}
                onPress={() => onSelect(key)}
              />
            ))}
          </div>
          <div style={{ paddingTop: 12, paddingBottom: 4 }}>
            {selected === 'custom' && savedCustomRange.startDate && savedCustomRange.endDate ? (
              <div onClick={() => setShowDatePicker(p => !p)} style={{ cursor: 'pointer' }}>
                <Input
                  readOnly
                  value={formatDateRange(savedCustomRange.startDate, savedCustomRange.endDate)}
                  startIcon={<IconCalendar size={16} />}
                  containerClassName="cursor-pointer"
                />
              </div>
            ) : (
              <Button variant="outline" size="medium" className="w-full" onClick={() => setShowDatePicker(p => !p)}>
                Select Date
              </Button>
            )}
          </div>
          {hasSelection && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
              <button
                onClick={onClearAll}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 13,
                  color: colors.primary,
                  padding: '4px 12px',
                }}
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      )}

      {showDatePicker && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 228,
            width: 360,
            height: 540,
            zIndex: 10,
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: '0px 8px 20px 0px rgba(99,99,102,0.1)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <DateRangeCustomRange
              isVisible={true}
              hideOverlay
              fullHeight
              hideDragHandle
              simpleButton
              disableAutoScroll
              headerPaddingTop={24}
              initialStartDate={customRange.startDate}
              initialEndDate={customRange.endDate}
              onSelectDates={(startDate, endDate) => setCustomRange({ startDate, endDate })}
              onDismiss={() => setShowDatePicker(false)}
              onSave={() => {
                onSelectCustomRange(customRange.startDate, customRange.endDate);
                setShowDatePicker(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const HealthWalletLogo = () => (
  <img src={healthWalletLogoSvg} alt="Health Wallet" style={{ height: 35, width: 'auto' }} />
);

// ============ NotificationBanner ============

interface NotificationBannerProps {
  title: string;
  body: string;
  date: string;
  onMarkRead?: () => void;
  onViewStatement?: () => void;
}

const NotificationBanner = ({
  title,
  body,
  date,
  onMarkRead,
  onViewStatement,
}: NotificationBannerProps) => (
  <div
    style={{
      backgroundColor: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}
  >
    {/* Icon */}
    <div style={{ flexShrink: 0 }}>
      <CommsIcon variant="account" size={48} />
    </div>

    {/* Text */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, fontWeight: 500, color: colors.textDark, margin: 0 }}>
        {title}
      </p>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, fontWeight: 400, color: colors.textMuted, margin: '2px 0 0' }}>
        {body}
      </p>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 11, fontWeight: 400, color: colors.textMuted, margin: '4px 0 0' }}>
        {date}
      </p>
    </div>

    {/* Actions */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
      <button
        onClick={onMarkRead}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 13,
          color: colors.textMuted,
          padding: 0,
        }}
      >
        Mark as Read
      </button>
      <Button variant="fill" size="small" onClick={onViewStatement}>
        View Statement
      </Button>
    </div>
  </div>
);

// ============ AccountCard ============

interface AccountCardProps {
  icon: React.ReactNode;
  name: string;
  badge?: string;
  amount: string;
  limit?: string;
  subtitle: string;
  onClick?: () => void;
}

const AccountCard = ({ icon, name, badge, amount, limit, subtitle, onClick }: AccountCardProps) => (
  <div
    onClick={onClick}
    style={{
      flex: 1,
      backgroundColor: colors.white,
      borderRadius: 8,
      border: `1px solid ${colors.border}`,
      padding: '20px 24px',
      cursor: 'pointer',
      boxShadow: '0px 3px 4px 0px rgba(99,99,102,0.05)',
    }}
  >
    {/* Title row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      {icon}
      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15, fontWeight: 500, color: colors.textDark, flex: 1 }}>
        {name}
      </span>
      {badge && (
        <span
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 10,
            fontWeight: 500,
            color: colors.primary,
            border: `1px solid ${colors.primary}`,
            borderRadius: 4,
            padding: '1px 5px',
            flexShrink: 0,
          }}
        >
          {badge}
        </span>
      )}
      <IconArrowRight size={16} color={colors.primary} />
    </div>

    {/* Amount */}
    <div style={{ marginBottom: 4 }}>
      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 26, fontWeight: 700, color: colors.textDark, letterSpacing: -0.52 }}>
        ${amount}
      </span>
      {limit && (
        <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15, fontWeight: 400, color: colors.textMuted }}>
          {' '}/ ${limit}
        </span>
      )}
    </div>

    {/* Subtitle */}
    <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, fontWeight: 400, color: colors.textMuted, margin: 0 }}>
      {subtitle}
    </p>
  </div>
);

// ============ SectionLabel ============

const SectionLabel = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '20px 0 8px' }}>
    <span
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontSize: 10,
        fontWeight: 500,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
      }}
    >
      {label}
    </span>
    <IconHelpCircle size={14} />
  </div>
);

// ============ Type helper ============

type WalletBenefitType = 'HSA_FSA' | 'HRA' | 'DCFSA' | 'LPFSA' | 'RemoteWork' | 'Transit' | 'LSA' | 'Parking' | 'Rewards' | 'Funding' | 'Investment';

const toBenefit = (b: Transaction['benefit']): WalletBenefitType => b;

// ============ HomescreenWeb ============

interface HomescreenWebProps {
  userName?: string;
}

const HomescreenWeb = ({ userName = 'Frank' }: HomescreenWebProps) => {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [activeNav, setActiveNav] = useState('Wallet');
  const [notifPage, setNotifPage] = useState(1);
  const notifTotal = 2;
  const [benefitAccountOpen, setBenefitAccountOpen] = useState(false);
  const [benefitAccountSelected, setBenefitAccountSelected] = useState<string[]>([]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeSelected, setTypeSelected] = useState<string[]>([]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusSelected, setStatusSelected] = useState<string[]>([]);

  const [dateOpen, setDateOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState<string | null>(null);
  const [dateCustomRange, setDateCustomRange] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });

  const makeToggleOption = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (option: string) =>
    setter(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);

  const makeClearAll = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => () => { setter([]); };

  // ---- Filtering ----
  const allTransactions = [...pendingTransactions, ...clearedTransactions];

  const filteredTransactions = allTransactions.filter(t => {
    if (benefitAccountSelected.length > 0 && !benefitAccountSelected.includes(t.benefitAccount)) return false;

    if (typeSelected.length > 0) {
      const matchesType = typeSelected.some(sel =>
        (sel === 'Money In' && t.direction === 'MoneyIn') ||
        (sel === 'Money Out' && t.direction === 'MoneyOut')
      );
      if (!matchesType) return false;
    }

    if (statusSelected.length > 0 && !statusSelected.includes(t.type)) return false;

    if (dateSelected !== null) {
      const txDate = new Date(t.date);
      const now = new Date();
      if (dateSelected === 'custom') {
        if (dateCustomRange.startDate && txDate < dateCustomRange.startDate) return false;
        if (dateCustomRange.endDate) {
          const endOfDay = new Date(dateCustomRange.endDate);
          endOfDay.setHours(23, 59, 59, 999);
          if (txDate > endOfDay) return false;
        }
      } else {
        const daysMap: Record<string, number> = {
          last24hours: 1,
          last3days: 3,
          last7days: 7,
          last14days: 14,
          last30days: 30,
        };
        const days = daysMap[dateSelected];
        if (days !== undefined) {
          const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
          if (txDate < cutoff) return false;
        }
      }
    }

    return true;
  });

  const byDateDesc = (a: { date: string }, b: { date: string }) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

  const filteredPending = filteredTransactions.filter(t => t.type === 'Pending').sort(byDateDesc);
  const filteredCleared = filteredTransactions.filter(t => t.type === 'Cleared').sort(byDateDesc);

  const navItems = locale === 'en' ? healthWalletNavItemsEn : healthWalletNavItemsEs;
  const logOutLabel = locale === 'en' ? 'Log Out' : 'Carrar la sesión';

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', backgroundColor: colors.bg }}>

      {/* Sidebar */}
      <SideNav
        logo={<HealthWalletLogo />}
        navItems={navItems}
        activeItem={activeNav}
        locale={locale}
        logOutLabel={logOutLabel}
        onNavItemClick={setActiveNav}
        onLanguageToggle={() => setLocale(l => l === 'en' ? 'es' : 'en')}
      />

      {/* Main content */}
      <main className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 32, minWidth: 0 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h1
            style={{
              fontFamily: '"Droid Serif", Georgia, serif',
              fontSize: 36,
              fontWeight: 400,
              color: colors.textDark,
              margin: 0,
              letterSpacing: -0.72,
              lineHeight: '52px',
            }}
          >
            Good morning, {userName}.
          </h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="outline" size="medium" startIcon={<IconPlus size={14} />}>
              Deposit
            </Button>
            <Button variant="fill" size="medium">
              $ Reimburse
            </Button>
          </div>
        </div>

        {/* Notification banner */}
        <NotificationBanner
          title="HSA Monthly Account Statement"
          body="Your HSA Monthly Account Statement of Sept. 2025 is ready for review."
          date="06-28-2022 06:07 AM"
        />

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, marginBottom: 24 }}>
          <button
            onClick={() => setNotifPage(p => Math.max(1, p - 1))}
            disabled={notifPage === 1}
            style={{
              background: 'none',
              border: `1px solid ${colors.borderDark}`,
              borderRadius: '50%',
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: notifPage === 1 ? 'default' : 'pointer',
              padding: 0,
              opacity: notifPage === 1 ? 0.4 : 1,
            }}
          >
            <span style={{ transform: 'rotate(180deg)', display: 'flex' }}>
              <IconChevronRight size={14} color={colors.textMuted} />
            </span>
          </button>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, color: colors.textMuted }}>
            {notifPage}/{notifTotal}
          </span>
          <button
            onClick={() => setNotifPage(p => Math.min(notifTotal, p + 1))}
            disabled={notifPage === notifTotal}
            style={{
              background: 'none',
              border: `1px solid ${colors.borderDark}`,
              borderRadius: '50%',
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: notifPage === notifTotal ? 'default' : 'pointer',
              padding: 0,
              opacity: notifPage === notifTotal ? 0.4 : 1,
            }}
          >
            <IconChevronRight size={14} color={colors.textMuted} />
          </button>
        </div>

        {/* Account cards */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <AccountCard
            icon={<BenefitIconDuo icon="HSA_FSA" />}
            name="Health Savings"
            amount="10,564.61"
            subtitle="HSA + Investments"
          />
          <AccountCard
            icon={<BenefitIconDuo icon="LPFSA" />}
            name="Dental & Vision"
            badge="LP-FSA"
            amount="386.33"
            limit="500.00"
            subtitle="Available Balance"
          />
          <AccountCard
            icon={<BenefitIconDuo icon="Rewards" />}
            name="Health Rewards"
            amount="9.90"
            subtitle="Available Balance"
          />
        </div>

        {/* Transactions */}
        <div style={{ backgroundColor: colors.white, padding: 40, borderRadius: 8 }}>

          {/* Transactions header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <h2
              style={{
                fontFamily: '"Droid Serif", Georgia, serif',
                fontSize: 26,
                fontWeight: 400,
                color: colors.textDark,
                margin: 0,
              }}
            >
              Transactions
            </h2>
            {(() => {
              const anyActive = benefitAccountSelected.length > 0 || typeSelected.length > 0 || statusSelected.length > 0 || dateSelected !== null;
              const clearAll = () => {
                setBenefitAccountSelected([]);
                setTypeSelected([]);
                setStatusSelected([]);
                setDateSelected(null);
                setDateCustomRange({ startDate: null, endDate: null });
              };
              const filterButtons = (
                <>
                  <FilterDropdown
                    label="Benefit Account"
                    options={['Health Savings', 'HRA', 'DCFSA', 'LPFSA', 'Remote Work', 'Transit', 'LSA', 'Parking', 'Rewards', 'Investment Account']}
                    selected={benefitAccountSelected}
                    isOpen={benefitAccountOpen}
                    onToggle={() => setBenefitAccountOpen(o => !o)}
                    onToggleOption={makeToggleOption(setBenefitAccountSelected)}
                    onClearAll={makeClearAll(setBenefitAccountSelected)}
                    onClose={() => setBenefitAccountOpen(false)}
                  />
                  <FilterDropdown
                    label="Type"
                    options={['Money In', 'Money Out']}
                    selected={typeSelected}
                    isOpen={typeOpen}
                    onToggle={() => setTypeOpen(o => !o)}
                    onToggleOption={makeToggleOption(setTypeSelected)}
                    onClearAll={makeClearAll(setTypeSelected)}
                    onClose={() => setTypeOpen(false)}
                  />
                  <FilterDropdown
                    label="Status"
                    options={['Cleared', 'Pending']}
                    selected={statusSelected}
                    isOpen={statusOpen}
                    onToggle={() => setStatusOpen(o => !o)}
                    onToggleOption={makeToggleOption(setStatusSelected)}
                    onClearAll={makeClearAll(setStatusSelected)}
                    onClose={() => setStatusOpen(false)}
                  />
                  <TransactionDateFilter
                    selected={dateSelected}
                    savedCustomRange={dateCustomRange}
                    isOpen={dateOpen}
                    onToggle={() => setDateOpen(o => !o)}
                    onSelect={(key) => { setDateSelected(key); }}
                    onSelectCustomRange={(startDate, endDate) => {
                      setDateCustomRange({ startDate, endDate });
                      setDateSelected('custom');
                    }}
                    onClearAll={() => { setDateSelected(null); setDateCustomRange({ startDate: null, endDate: null }); }}
                    onClose={() => setDateOpen(false)}
                  />
                </>
              );
              return (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', backgroundColor: anyActive ? colors.bg : 'transparent', padding: 8, borderRadius: 8 }}>
                  {anyActive && (
                    <button
                      onClick={clearAll}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 15,
                        color: colors.primary,
                        padding: '8px 12px',
                        height: 40,
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Clear All
                    </button>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
                    {filterButtons}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Pending */}
          {filteredPending.length > 0 && (
            <>
              <SectionLabel label="Pending" />
              <div>
                {filteredPending.map((t, i) => (
                  <WalletTransactionListItemWeb
                    key={`pending-${i}`}
                    merchantName={t.merchantName}
                    benefitAccount={t.benefitAccount}
                    transactionAmount={t.transactionAmount}
                    date={t.date}
                    type="Pending"
                    benefit={toBenefit(t.benefit)}
                    isMoneyOut={t.direction === 'MoneyOut'}
                    hasBottomDivider={i < filteredPending.length - 1}
                  />
                ))}
              </div>
            </>
          )}

          {/* Cleared */}
          {filteredCleared.length > 0 && (
            <>
              <SectionLabel label="Cleared" />
              <div>
                {filteredCleared.map((t, i) => (
                  <WalletTransactionListItemWeb
                    key={`cleared-${i}`}
                    merchantName={t.merchantName}
                    benefitAccount={t.benefitAccount}
                    transactionAmount={t.transactionAmount}
                    date={t.date}
                    type={t.direction}
                    benefit={toBenefit(t.benefit)}
                    isMoneyOut={t.direction === 'MoneyOut'}
                    hasBottomDivider={i < filteredCleared.length - 1}
                  />
                ))}
              </div>
            </>
          )}

          {filteredTransactions.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 20, fontWeight: 400, color: '#60758f', letterSpacing: -0.4, margin: '0 0 4px 0' }}>
                Nothing... yet.
              </p>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15, color: '#b8c0ca', letterSpacing: -0.15, margin: 0, textAlign: 'center' }}>
                No transaction matches your criteria.<br />Update filter and try again.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default HomescreenWeb;
