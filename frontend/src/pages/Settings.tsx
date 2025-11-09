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
    <div className="flex flex-col gap-8 mt-4">
      {/* Profile */}
      <section>
        <h3 className="font-semibold text-gray-900 text-lg mb-3">Profile</h3>
        <div className="md:divide-y">
          {/* Name */}
          <div className="flex flex-col gap-2 py-4 ">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-sm text-gray-600 font-semibold">Name</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Change Name', <ChangeName onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
            <span className="text-gray-800 font-bold md:hidden">{profile.name}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold w-1/5">Name</span>
              <span className="text-gray-800 font-bold flex-1 whitespace-nowrap">
                {profile.name}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Change Name', <ChangeName onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 py-4">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-sm text-gray-600 font-semibold">Email</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Update Email', <ChangeEmail onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
            <span className="text-gray-800 font-bold md:hidden">{profile.email}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold w-1/5">Email</span>
              <span className="text-gray-800 font-bold flex-1 whitespace-nowrap">
                {profile.email}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Update Email', <ChangeEmail onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 py-4 ">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-sm text-gray-600 font-semibold">Address</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Update Address', <ChangeAddress onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
            <span className="text-gray-800 font-bold md:hidden">{profile.address}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold w-1/5">Address</span>
              <span className="text-gray-800 font-bold flex-1 whitespace-nowrap">
                {profile.address}
              </span>
              <Button
                className="px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Update Address', <ChangeAddress onClose={() => setIsOpen(false)} />)
                }
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 py-4 ">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-sm text-gray-600 font-semibold">Password</span>
              <Button
                className="px-5 py-1"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Change Password', <ChangePassword onClose={() => setIsOpen(false)} />)
                }
              >
                Change password
              </Button>
            </div>
            <span className="text-gray-800 font-bold md:hidden">**********</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold w-1/5">Password</span>
              <span className="text-gray-800 font-bold flex-1 whitespace-nowrap">
                **********
              </span>
              <Button
                className="px-5 py-1 md:px-10 flex-shrink-0"
                buttonColor="regularButton"
                textColor="white"
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
        <h3 className="font-semibold text-gray-900 text-lg mb-3">Preferences</h3>
        <div className="md:divide-y">
          {/* Language */}
          <div className="flex flex-col gap-2 py-4">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-sm text-gray-600 font-semibold">Language</span>
              <Button
                className="bg-blue-600 text-white rounded-xl px-5 py-1"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Update Language', <ChangeLanguage onClose={() => setIsOpen(false)} />)
                }
              >
                Change
              </Button>
            </div>
            <span className="text-gray-800 font-bold md:hidden">{preferences.language}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold w-1/5">Language</span>
              <span className="text-gray-800 font-bold flex-1 whitespace-nowrap">
                {preferences.language}
              </span>
              <Button
                className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="white"
                onClick={() =>
                  openDrawer('Update Language', <ChangeLanguage onClose={() => setIsOpen(false)} />)
                }
              >
                Change
              </Button>
            </div>
          </div>

          {/* Mode */}
          <div className="flex flex-col gap-2 py-4 ">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-sm text-gray-600 font-semibold">Mode</span>
              <Button
                className="bg-blue-600 text-white rounded-xl px-5 py-1"
                buttonColor="regularButton"
                textColor="white"
                onClick={() => openDrawer('Change Mode', <div>ModeChange Component Here</div>)}
              >
                Change
              </Button>
            </div>
            <span className="text-gray-800 font-bold md:hidden">{preferences.mode}</span>
            <div className="hidden md:flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 font-semibold w-1/5">Mode</span>
              <span className="text-gray-800 font-bold flex-1 whitespace-nowrap">
                {preferences.mode}
              </span>
              <Button
                className="bg-[--brand-equivalence] text-white rounded-xl px-5 py-1 flex-shrink-0"
                buttonColor="regularButton"
                textColor="white"
                onClick={() => openDrawer('Change Mode', <div>ModeChange Component Here</div>)}
              >
                Change
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // === Finance Section ===
  const renderFinance = () => {
    const hideScrollbar: React.CSSProperties = {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
    };

    return (
      <div className="flex flex-col gap-6 mt-4">
        {/* Expense Categories */}
        <section className="divide-y lg:border-b-1 border-[#EBEBEB]">
          <div className="hidden md:flex items-center gap-4 pb-4">
            <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">
              Expense Categories
            </h3>
            <div
              className="flex flex-wrap gap-2 flex-1 overflow-x-auto md:overflow-visible"
              style={hideScrollbar}
            >
              {finance.expenseCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-sm rounded-full text-gray-700 border whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
            <Button
              className="bg-[--brand-equivalence] text-white rounded-xl px-5 py-1 flex-shrink-0"
              buttonColor="regularButton"
              textColor="white"
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

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900 text-base">Expense Categories</h3>
            <div className="flex overflow-x-auto gap-2" style={hideScrollbar}>
              {finance.expenseCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-sm rounded-full text-gray-700 border whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Income Categories */}
        <section className="divide-y border-b border-gray-300">
          <div className="hidden md:flex items-center gap-4 pb-4">
            <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">
              Income Categories
            </h3>
            <div
              className="flex flex-wrap gap-2 flex-1 overflow-x-auto md:overflow-visible"
              style={hideScrollbar}
            >
              {finance.incomeCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-sm rounded-full text-gray-700 border whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
            <Button
              className="bg-[--brand-equivalence] text-white rounded-xl px-5 py-1 flex-shrink-0"
              buttonColor="regularButton"
              textColor="white"
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

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900 text-base">Income Categories</h3>
            <div className="flex overflow-x-auto gap-2" style={hideScrollbar}>
              {finance.incomeCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-sm rounded-full text-gray-700 border whitespace-nowrap"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Tax Regime */}
        <section className="divide-y lg:border-b border-gray-300">
          <div className="hidden md:flex items-center gap-4 pb-4">
            <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">Tax Regime</h3>
            <p className="flex-1 px-3 py-2 text-gray-600 text-sm">{finance.taxRegime}</p>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
              buttonColor="regularButton"
              textColor="white"
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

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-base">Tax Regime</h3>
              <Button
                className="bg-blue-600 text-white rounded-xl px-4 py-1"
                buttonColor="regularButton"
                textColor="white"
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
            <p className="text-gray-600 text-sm">{finance.taxRegime}</p>
          </div>
        </section>

        {/* Export Data */}
        <section className="border rounded-xl border-gray-300 md:border-none md:rounded-none p-4 md:p-0">
          <div className="flex justify-between items-center w-full pb-4">
            <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">Export Data</h3>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
              buttonColor="regularButton"
              textColor="white"
              onClick={() =>
                openDrawer('Change Mode', <ChangeMode onClose={() => setIsOpen(false)} />)
              }
            >
              Export
            </Button>
          </div>
        </section>
      </div>
    );
  };

  if (isLoading) return <div className="p-10 text-gray-600">Loading...</div>;
  if (!isAuthenticated)
    return <div className="p-10 text-gray-600">Please log in to view settings.</div>;

  return (
    <div className="flex flex-col gap-8 w-full">
      <SettingsDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={drawerTitle}>
        {drawerContent}
      </SettingsDrawer>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Settings</h1>

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
