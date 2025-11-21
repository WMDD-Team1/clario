import React, { useMemo, useState } from 'react';
import Button from '@/components/Button';
import ToggleButton from '@/components/ToggleButton';
import { useAuth0 } from '@auth0/auth0-react';
import SettingsDrawer from '../components/forms/SettingsDrawer';

// Import your forms/components
import ChangeName from '@components/forms/ChangeName';
import ChangePassword from '@components/forms/ChangePassword';
import ChangeEmail from '@components/forms/ChangeEmail';
import ChangeAddress from '@components/forms/ChangeAddress';
import ChangeLanguage from '@components/forms/ChangeLanguage';
import ExpensesCategories from '@components/forms/ExpensesCategories';
import IncomeCategories from '@components/forms/IncomeCategories';
import ChangeTaxRegime from '@components/forms/ChangeTaxRegime';
import ChangeMode from '@components/forms/ChangeMode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { exportUserTransactions } from '@api/services/settingService';

const Settings: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state: RootState) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const [activeSection, setActiveSection] = useState({
    key: 'general',
    label: 'General',
  });

  const profile = useMemo(
    () => ({
      name: user?.name || '',
      email: user?.email || '',
      address: user?.address
        ? `${user.address.street || ''} ${user.address.city || ''} ${
            user.address.country || ''
          } ${user.address.postalCode || ''}`.trim()
        : '',
    }),
    [user],
  );

  const preferences = {
    language: user?.settings?.general?.language === 'fr' ? 'French' : 'English',
    mode: user?.settings?.general?.theme === 'dark' ? 'Dark Mode' : 'Light Mode',
  };

  const finance = {
    expenseCategories: user?.settings?.finance?.expenseCategories || [
      'Software & Tools',
      'Equipment & Hardware',
      'Subscriptions',
      'Professional Services',
    ],
    incomeCategories: user?.settings?.finance?.incomeCategories || [
      'Project Income',
      'Recurring Income',
      'Consulting',
    ],
    taxRegime: user?.settings?.finance?.province || 'British Columbia',
  };

  const openDrawer = (title: string, content: React.ReactNode) => {
    setDrawerTitle(title);
    setDrawerContent(content);
    setIsOpen(true);
  };

  const handleExportData = async () => {
    const blob = await exportUserTransactions();
    if (!blob || blob.size === 0) {
      console.log('No transactions found to export.');
      return;
    }
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  // === General Section ===
  const renderGeneral = () => (
    <div className="flex flex-col gap-8 mt-4 font-['Red_Hat_Display']">
      {/* Profile */}
      <section>
        <h3 className="!text-[var(--page-title)] text-[clamp(1.75rem,calc(1.536rem+1.071vw),2.5rem)] mb-3">Profile</h3>

        <div className='gap-4'>
          {/* Name */}
          <div className="flex flex-col gap-2 px-4 py-4 rounded-xl border border-[var(--sublight-2)]">
            <div className="flex justify-between items-top md:hidden text-base font-['Red_Hat_Display']">
              <span className="text-[var(--primary-text)]">Name</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Change Name', <ChangeName onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
            <span className="text-base text-[var(--tertiary-text)] md:hidden font-['Red_Hat_Display'] font-bold mt-[-30px]">{profile.name}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-base text-[var(--tertiary-text)] !font-normal w-1/5">Name</span>
              <span className="text-lg text-[var(--tertiary-text)] !font-normal flex-1 whitespace-nowrap">
                {profile.name}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Change Name', <ChangeName onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 px-4 py-4 rounded-xl border border-[var(--sublight-2)]">
            <div className="flex justify-between items-top md:hidden text-base font-['Red_Hat_Display']">
              <span className="text-[var(--primary-text)]">Email</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Update Email', <ChangeEmail onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
            <span className="text-lg text-[var(--tertiary-text)] md:hidden font-['Red_Hat_Display'] font-bold mt-[-30px]">{profile.email}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-base text-[var(--tertiary-text)] !font-normal w-1/5">Email</span>
              <span className="text-lg text-[var(--tertiary-text)] !font-normal flex-1 whitespace-nowrap">
                {profile.email}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Update Email', <ChangeEmail onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <div className="flex justify-between items-top md:hidden">
              <span className="text-base text-[var(--tertiary-text)]">Address</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Update Address', <ChangeAddress onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
            <span className="text-lg text-[var(--tertiary-text)] md:hidden font-['Red_Hat_Display'] font-bold mt-[-30px]">{profile.address}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-base text-[var(--tertiary-text)] font-normal w-1/5">Address</span>
              <span className="text-lg text-[var(--tertiary-text)] font-normal flex-1 whitespace-nowrap">
                {profile.address}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Update Address', <ChangeAddress onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <div className="flex justify-between items-top md:hidden">
              <span className="text-base text-[var(--tertiary-text)] font-normal">Password</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Change Password', <ChangePassword onClose={() => setIsOpen(false)} />)
                }
              >
                Change password
              </Button>
            </div>
            <span className="text-lg text-[var(--tertiary-text)] md:hidden font-['Red_Hat_Display'] font-bold mt-[-30px]">**********</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-base text-[var(--tertiary-text)] font-normal w-1/5">Password</span>
              <span className="text-lg text-[var(--tertiary-text)] font-normal flex-1 whitespace-nowrap">
                **********
              </span>
              <Button
                className="px-5 py-1 md:px-10 flex-shrink-0"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Change Password', <ChangePassword onClose={() => setIsOpen(false)} />)
                }
              >
                Change password
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section>
        <h3 className="!text-[var(--tertiary-text)] text-[clamp(1.75rem,calc(1.536rem+1.071vw),2.5rem)] mb-3">Preferences</h3>
        <div className="md:divide-y divide-[var(--sublight-2)]">
          {/* Language */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <div className="flex justify-between items-top md:hidden">
              <span className="text-base text-[var(--tertiary-text)] font-normal">Language</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Update Language', <ChangeLanguage onClose={() => setIsOpen(false)} />)
                }
              >
                Change
              </Button>
            </div>
            <span className="text-lg text-[var(--tertiary-text)] md:hidden font-['Red_Hat_Display'] font-bold mt-[-30px]">{preferences.language}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-base text-[var(--tertiary-text)] w-1/5">Language</span>
              <span className="text-lg text-[var(--tertiary-text)] flex-1 whitespace-nowrap">
                {preferences.language}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer('Update Language', <ChangeLanguage onClose={() => setIsOpen(false)} />)
                }
              >
                Change
              </Button>
            </div>
          </div>

          {/* Mode */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <div className="flex justify-between items-top md:hidden">
              <span className="text-base text-[var(--tertiary-text)]">Mode</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() => openDrawer('Change Mode', <ChangeMode onClose={() => setIsOpen(false)} />)}
              >
                Change
              </Button>
            </div>
            <span className="text-lg text-[var(--tertiary-text)] md:hidden font-['Red_Hat_Display'] font-bold mt-[-30px]">{preferences.mode}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-base text-[var(--tertiary-text)] w-1/5">Mode</span>
              <span className="text-lg text-[var(--tertiary-text)] flex-1 whitespace-nowrap">
                {preferences.mode}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() => openDrawer('Change Mode', <ChangeMode onClose={() => setIsOpen(false)} />)}
              >
                Change
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderFinance = () => {
    const hideScrollbar: React.CSSProperties = {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
    };

    return (
      <div className="flex flex-col gap-6 mt-4 font-['Montserrat']">
        {/* ===== Expenses Categories ===== */}
        <section className="rounded-xl border border-[var(--sublight-2)] p-4 md:p-0 md:shadow-none md:border-none">
          {/* Mobile layout */}
          <div className="md:hidden flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-[var(--tertiary-text)] text-base">
                Expenses Categories
              </h3>
              <Button
                className="text-[var(--general-alpha)] rounded-xl px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer(
                    'Expenses Categories',
                    <ExpensesCategories
                      expenseCategories={finance.expenseCategories}
                      onClose={() => setIsOpen(false)}
                    />,
                  )
                }
              >
                Add/Edit
              </Button>
            </div>
            <div
              className="flex flex-wrap gap-2 overflow-x-auto pb-1"
              style={hideScrollbar}
            >
              {finance.expenseCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-base rounded-full border border-[var(--sublight-2)] text-[var(--tertiary-text)]whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex rounded-xl border border-[var(--sublight-2)] items-center gap-4 px-4 py-4">
            <h3 className=" text-[var(--tertiary-text)] text-base flex-[0_0_200px]">
              Expense Categories
            </h3>
            <div
              className="flex flex-wrap gap-2 flex-1 overflow-x-auto md:overflow-visible"
              style={hideScrollbar}
            >
              {finance.expenseCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-base font-semibold rounded-full border border-[var(--secondary-text)] text-[var(--tertiary-text)] whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
            <Button
              className="bg-[--brand-equivalence] text-[var(--general-alpha)] rounded-xl px-5 py-1 flex-shrink-0"
              buttonColor="regularButton"
              textColor="var(--general-alpha)"
              onClick={() =>
                openDrawer(
                  'Expenses Categories',
                  <ExpensesCategories
                    expenseCategories={finance.expenseCategories}
                    onClose={() => setIsOpen(false)}
                  />,
                )
              }
            >
              Add/Edit
            </Button>
          </div>
        </section>

        {/* ===== Income Categories ===== */}
        <section className="rounded-xl border border-[var(--sublight-2)] p-4 md:p-0 md:shadow-none md:border-none">
          {/* Mobile layout */}
          <div className="md:hidden flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-[var(--tertiary-text)] text-base">
                Income Categories
              </h3>
              <Button
                className=" text-white rounded-xl px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer(
                    'Income Categories',
                    <IncomeCategories
                      incCategories={finance.incomeCategories}
                      onClose={() => setIsOpen(false)}
                    />,
                  )
                }
              >
                Add/Edit
              </Button>
            </div>
            <div
              className="flex flex-wrap gap-2 overflow-x-auto pb-1"
              style={hideScrollbar}
            >
              {finance.incomeCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-base rounded-full border border-[var(--sublight-2)] text-[var(----tertiary-text)]whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex items-center gap-4 px-4 py-4 rounded-xl border border-[var(--sublight-2)]">
            <h3 className=" text-[var(--tertiary-text)] text-base flex-[0_0_200px]">
              Income Categories
            </h3>
            <div
              className="flex flex-wrap gap-2 flex-1 overflow-x-auto md:overflow-visible"
              style={hideScrollbar}
            >
              {finance.incomeCategories.map((cat) => (
                <span
                  key={cat}
                  className="font-semibold px-3 py-1 text-base rounded-full border border-[var(--secondary-text)] text-[var(--tertiary-text)] whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
            <Button
              className="bg-[--brand-equivalence] text-[var(--general-alpha)] rounded-xl px-5 py-1 flex-shrink-0"
              buttonColor="regularButton"
              textColor="var(--general-alpha)"
              onClick={() =>
                openDrawer(
                  'Income Categories',
                  <IncomeCategories
                    incCategories={finance.incomeCategories}
                    onClose={() => setIsOpen(false)}
                  />,
                )
              }
            >
              Add/Edit
            </Button>
          </div>
        </section>

        {/* ===== Tax Regime ===== */}
        <section className="rounded-xl border border-[var(--sublight-2)] p-4 md:p-0 md:shadow-none md:border-none">
          {/* Mobile layout */}
          <div className="md:hidden flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-[var(--tertiary-text)] text-base">Tax Regime</h3>
              <Button
                className=" text-white rounded-xl px-5 py-1"
                buttonColor="regularButton"
                textColor="var(--general-alpha)"
                onClick={() =>
                  openDrawer(
                    'Update Tax Regime',
                    <ChangeTaxRegime tax={finance.taxRegime} onClose={() => setIsOpen(false)} />,
                  )
                }
              >
                Edit
              </Button>
            </div>
            <p className="text-[var(--tertiary-text)]text-base">{finance.taxRegime}</p>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex items-center gap-4 px-4 py-4 rounded-xl border border-[var(--sublight-2)]">
            <h3 className="text-[var(--tertiary-text)] text-base flex-[0_0_200px]">Tax Regime</h3>
            <p className="flex-1 px-3 py-2 text-[var(--tertiary-text)] text-base">{finance.taxRegime}</p>
            <Button
              className="text-[var(--general-alpha)] rounded-xl px-5 py-1 flex-shrink-0"
              buttonColor="regularButton"
              textColor="var(--general-alpha)"
              onClick={() =>
                openDrawer(
                  'Update Tax Regime',
                  <ChangeTaxRegime tax={finance.taxRegime} onClose={() => setIsOpen(false)} />,
                )
              }
            >
              Edit
            </Button>
          </div>
        </section>

        {/* ===== Export Data ===== */}
        <section className="rounded-xl border border-[var(--sublight-2)] p-4 md:p-0 md:shadow-none md:border-none border-b">
          <div className="flex justify-between items-center px-4 py-4 rounded-xl border border-[var(--sublight-2)]">
            <h3 className=" text-[var(--tertiary-text)] text-base">Export Data</h3>
            <Button
              className="text-[var(--general-alpha)] rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="var(--general-alpha)"
              onClick={handleExportData}
            >
              Export
            </Button>
          </div>
        </section>
      </div>
    );
  };

  if (isLoading) return <div className="p-10 text-[var(--tertiary-text)]">Loading...</div>;
  if (!isAuthenticated)
    return <div className="p-10 text-[var(--tertiary-text)]">Please log in to view settings.</div>;

  return (
    <div className="flex flex-col gap-8 w-full">
      
      <SettingsDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={drawerTitle}>
        {drawerContent}
      </SettingsDrawer>
      <h1 className="block sm:hidden font-['Merriweather'] font-bold text-[clamp(1.75rem,calc(1.536rem+1.071vw),2.5rem)] text-[var(--page-subtitle)]">
        Settings
      </h1>
      <div className="sticky top-36 z-99 bg-[color-mix(in_srgb,var(--full-bg),transparent_10%)] backdrop-blur-sm">
        <h1 className="font-['Merriweather'] font-bold text-[clamp(1.75rem,calc(1.536rem+1.071vw),2.5rem)] text-[var(--page-subtitle)] hidden sm:block">
          Settings
        </h1>
      </div>

      <div className="max-w">
        <ToggleButton
          options={[
            { key: 'general', label: 'General' },
            { key: 'finance', label: 'Finance' },
          ]}
          option={activeSection}
          onClick={setActiveSection}
        />

        <div className="mt-2">
          {activeSection.key === 'general' && renderGeneral()}
          {activeSection.key === 'finance' && renderFinance()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
