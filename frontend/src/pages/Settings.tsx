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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';

import { exportUserTransactions } from '@api/services/settingService';

const Settings: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state: RootState) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const [activeSection, setActiveSection] = useState({
    key: 'general',
    label: 'General',
  });
  console.log(user);

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
      // when there's no data, show toast
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
        <div className="divide-y border-b">
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Name</span>
            <span className="text-gray-800 flex-1">{profile.name}</span>
            <Button
              className="rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() =>
                openDrawer('Change Name', <ChangeName onClose={() => setIsOpen(false)} />)
              }
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Email</span>
            <span className="text-gray-800 flex-1">{profile.email}</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() =>
                openDrawer('Update Email', <ChangeEmail onClose={() => setIsOpen(false)} />)
              }
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Address</span>
            <span className="text-gray-800 flex-1">{profile.address}</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() =>
                openDrawer('Update Address', <ChangeAddress onClose={() => setIsOpen(false)} />)
              }
            >
              Edit
            </Button>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Password</span>
            <span className="text-gray-800 flex-1">*************</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
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
      </section>

      {/* Preferences */}
      <section>
        <h3 className="font-semibold text-gray-900 text-lg mb-3">Preferences</h3>
        <div className="divide-y border-b">
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Language</span>
            <span className="text-gray-800 flex-1">{preferences.language}</span>
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

          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 w-1/3">Mode</span>
            <span className="text-gray-800 flex-1">{preferences.mode}</span>
            <Button
              className="bg-blue-600 text-white rounded-xl px-5 py-1"
              buttonColor="regularButton"
              textColor="white"
              onClick={() => openDrawer('Change Mode', <div>ModeChange Component Here</div>)}
            >
              Change
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  // === Finance Section ===
  const renderFinance = () => (
    <div className="flex flex-col gap-6 mt-4">
      {/* Expense Categories */}
      <section className="divide-y border-b border-gray-300">
        <div className="flex justify-between items-center">
          <h3 className="w-1/5 font-semibold text-gray-900 text-base flex-shrink-0">
            Expense Categories
          </h3>

          {/* Categories scrollable */}
          <div className="gap-2 overflow-x-auto mx-4 py-5 flex-1">
            {finance.expenseCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 mx-2 text-sm rounded-full text-gray-700 flex-shrink-0 whitespace-nowrap border border-black"
              >
                {cat}
              </span>
            ))}
          </div>

          <Button
            className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
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
      </section>

      {/* Income Categories */}
      <section className="divide-y border-b border-gray-300">
        <div className="flex justify-between items-center">
          <h3 className="w-1/5 font-semibold text-gray-900 text-base flex-shrink-0">
            Income Categories
          </h3>

          {/* Categories scrollable */}
          <div className="gap-2 overflow-x-auto mx-4 py-5 flex-1">
            {finance.incomeCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 mx-2 text-sm rounded-full text-gray-700 flex-shrink-0 whitespace-nowrap border border-black"
              >
                {cat}
              </span>
            ))}
          </div>

          <Button
            className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
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
      </section>

      {/* Tax Regime */}
      <section className="divide-y border-b border-gray-300">
        <div className="flex justify-between items-center">
          <h3 className="w-1/5 font-semibold text-gray-900 text-base flex-shrink-0">Tax Regime</h3>
          <p className="flex-1 gap-2 px-3 py-6 mx-6 text-gray-600 text-sm">{finance.taxRegime}</p>
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
      </section>

      {/* Export Data */}
      <section className="divide-y border-b border-gray-300">
        <div className="flex justify-between items-center mb-2">
          <h3 className="w-1/5 font-semibold text-gray-900 text-base flex-shrink-0">Export Data</h3>
          <Button
            className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
            buttonColor="regularButton"
            textColor="white"
            onClick={handleExportData}
          >
            Export
          </Button>
        </div>
      </section>
    </div>
  );

  if (isLoading) return <div className="p-10 text-gray-600">Loading...</div>;
  if (!isAuthenticated)
    return <div className="p-10 text-gray-600">Please log in to view settings.</div>;

  return (
    <div className="flex flex-col gap-8 w-full px-10 md:px-14 pr-16">
      {/* Drawer with dynamic content */}
      <SettingsDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={drawerTitle}>
        {drawerContent}
      </SettingsDrawer>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Settings</h1>

      <div className="max-w-[1200px]">
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
