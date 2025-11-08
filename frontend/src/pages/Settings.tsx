import React, { useState } from 'react';
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

const Settings: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const [activeSection, setActiveSection] = useState({
    key: 'general',
    label: 'General',
  });

  const [profile] = useState({
    name: 'Yosimar Yotún',
    email: 'bebexito@emoxito.com',
    address: '5 - 312 3rd Ave, Vancouver British Columbia, v6z-1y9',
  });

  const [preferences] = useState({
    language: 'English',
    mode: 'Bright Mode',
  });

  const [finance] = useState({
    expenseCategories: [
      'Software & Tools',
      'Equipment & Hardware',
      'Subscriptions',
      'Professional Services',
    ],
    incomeCategories: ['Project Income', 'Recurring Income', 'Consulting'],
    taxRegime: 'British Columbia',
  });

  // 🔹 Opens drawer with specific content
  const openDrawer = (title: string, content: React.ReactNode) => {
    setDrawerTitle(title);
    setDrawerContent(content);
    setIsOpen(true);
  };

  const handleExportData = () => {
    console.log('Export data clicked');
  };

  // === General Section ===
  const renderGeneral = () => (
    <div>
    <div className="flex flex-col gap-8 mt-4 md:border-b">
      {/* Profile */}
      <section>
        <h3 className="font-semibold text-gray-900 text-lg mb-3">Profile</h3>
        <div className="md:divide-y">
          <div className="flex flex-col gap-2 py-4 ">
            {/* Mobile: Heading + Button */}
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

            {/* Mobile: Value */}
            <span className="text-gray-800 font-bold md:hidden">{profile.name}</span>

            {/* md+: Single row layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Label */}
              <span className="text-sm text-gray-600 font-semibold w-1/5">Name</span>

              {/* Value (centered) */}
              <span className="text-gray-800 font-bold flex-1  whitespace-nowrap">
                {profile.name}
              </span>

              {/* Button */}
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
          <div className="flex flex-col gap-2 py-4">
            {/* Mobile: Heading + Button */}
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

            {/* Mobile: Value */}
            <span className="text-gray-800 font-bold md:hidden">{profile.email}</span>

            {/* md+: Single row layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Label */}
              <span className="text-sm text-gray-600 font-semibold w-1/5">Email</span>

              {/* Value (centered) */}
              <span className="text-gray-800 font-bold flex-1  whitespace-nowrap">
                {profile.email}
              </span>

              {/* Button */}
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

          <div className="flex flex-col gap-2 py-4 ">
            {/* Mobile: Heading + Button */}
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

            {/* Mobile: Value */}
            <span className="text-gray-800 font-bold md:hidden">{profile.address}</span>

            {/* md+: Single row layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Label */}
              <span className="text-sm text-gray-600 font-semibold w-1/5">Address</span>

              {/* Value (centered) */}
              <span className="text-gray-800 font-bold flex-1  whitespace-nowrap">
                {profile.address}
              </span>

              {/* Button */}
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

          <div className="flex flex-col gap-2 py-4 ">
            {/* Mobile: Heading + Button */}
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

            {/* Mobile: Value */}
            <span className="text-gray-800 font-bold md:hidden">**********</span>

            {/* md+: Single row layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Label */}
              <span className="text-sm text-gray-600 font-semibold w-1/5">Password</span>

              {/* Value (centered) */}
              <span className="text-gray-800 font-bold flex-1  whitespace-nowrap">
                **********
              </span>

              {/* Button */}
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
      </div>

      <div className="flex flex-col gap-8 mt-4 md:border-b">
      {/* Preferences */}
      <section>
        <h3 className="font-semibold text-gray-900 text-lg mb-3">Preferences</h3>
        <div className="md:divide-y">
          <div className="flex flex-col gap-2 py-4  ">
            {/* Mobile: Heading + Button */}
            <div className="flex justify-between items-center md:hidden">
              <span className="text-sm text-gray-600 font-semibold">Language</span>
              <Button
                className="bg-blue-600 text-white rounded-xl  px-5 py-1"
                buttonColor="regularButton"
                textColor="white" 
                onClick={() =>
                  openDrawer('Update Language', <ChangeLanguage onClose={() => setIsOpen(false)} />)
                }
              >
                Change
              </Button>
            </div>

            {/* Mobile: Value */}
            <span className="text-gray-800 font-bold md:hidden">{preferences.language}</span>

            {/* md+: Single row layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Label */}
              <span className="text-sm text-gray-600 font-semibold w-1/5">Language</span>

              {/* Value (centered) */}
              <span className="text-gray-800 font-bold flex-1  whitespace-nowrap">
                {preferences.language}
              </span>

              {/* Button */}
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

          <div className="flex flex-col gap-2 py-4 ">
            {/* Mobile: Heading + Button */}
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

            {/* Mobile: Value */}
            <span className="text-gray-800 font-bold md:hidden">{preferences.mode}</span>

            {/* md+: Single row layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Label */}
              <span className="text-sm text-gray-600 font-semibold w-1/5">Mode</span>

              {/* Value (centered) */}
              <span className="text-gray-800 font-bold flex-1  whitespace-nowrap">
                {preferences.mode}
              </span>

              {/* Button */}
              <Button
                className="bg-blue-600 text-white rounded-xl px-5 py-1 flex-shrink-0"
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
    </div>
  );

  // === Finance Section ===
  const renderFinance = () => (
    <div className="flex flex-col gap-6 mt-4 md:border-b border-gray-300">
      {/* Expense Categories */}
      <section className="divide-y lg:border-b border-gray-300">
        <div className="flex flex-col gap-2 pb-4 border rounded-xl border-gray-300 md:border-none md:rounded-none p-4 md:p-0">
          {/* Mobile top row: Heading + Button */}
          <div className="flex justify-between items-center w-full md:hidden">
            <h3 className="font-semibold text-gray-900 text-base">Expense Categories</h3>

            <Button
              className="bg-blue-600 text-white rounded-xl px-4 py-1"
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

          {/* Options on mobile (wrap normally, not scrollable) */}
          <div className="flex flex-wrap gap-2 py-2 md:hidden">
            {finance.expenseCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 text-sm rounded-full text-gray-700 whitespace-nowrap border border-black"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* md+ row: Heading + scrollable Categories + Button */}
          <div className="hidden md:flex items-center gap-4 pb-4">
            <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">
              Expense Categories
            </h3>

            <div className="flex flex-1 gap-2 overflow-x-auto">
              {finance.expenseCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-sm rounded-full text-gray-700 flex-shrink-0 whitespace-nowrap border border-black"
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
        </div>
      </section>

      {/* Income Categories */}
      <section className="divide-y lg:border-b border-gray-300">
        <div className="flex flex-col gap-2 pb-4 border rounded-xl border-gray-300 md:border-none md:rounded-none p-4 md:p-0">
          {/* Mobile top row: Heading + Button */}
          <div className="flex justify-between items-center w-full md:hidden">
            <h3 className="font-semibold text-gray-900 text-base">Income Categories</h3>

            <Button
              className="bg-blue-600 text-white rounded-xl px-4 py-1"
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

          {/* Categories on mobile (wrap normally, not scrollable) */}
          <div className="flex flex-wrap gap-2 py-2 md:hidden">
            {finance.incomeCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 text-sm rounded-full text-gray-700 whitespace-nowrap border border-black"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* md+ row: Heading + scrollable Categories + Button */}
          <div className="hidden md:flex items-center gap-4 pb-4">
            <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">
              Income Categories
            </h3>

            <div className="flex flex-1 gap-2 overflow-x-auto">
              {finance.incomeCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-sm rounded-full text-gray-700 flex-shrink-0 whitespace-nowrap border border-black"
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
        </div>
      </section>

      {/* Tax Regime */}
      <section className="divide-y lg:border-b border-gray-300">
        <div className="flex flex-col gap-2 pb-4 border rounded-xl border-gray-300  md:border-none md:rounded-none p-4 md:p-0">
          {/* Mobile top row: Heading + Button */}
          <div className="flex justify-between items-center w-full md:hidden">
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

          {/* Value row on mobile */}
          <p className="px-3 py-2 text-gray-600 text-sm md:hidden">{finance.taxRegime}</p>

          {/* md+ row: Heading + Value + Button */}
          <div className="hidden md:flex items-center gap-4 pb-4">
            <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">Tax Regime</h3>

            <p className="flex-1 gap-2 px-3 py-2 text-gray-600 text-sm">{finance.taxRegime}</p>

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
        </div>
      </section>

      {/* Export Data */}
      <section className="border rounded-xl border-gray-300  md:border-none md:rounded-none p-4 md:p-0">
        <div className="flex justify-between items-center w-full pb-4">
          <h3 className="font-semibold text-gray-900 text-base flex-[0_0_200px]">Export Data</h3>

          <Button
            className="bg-blue-600 text-white rounded-xl px-4 py-1 md:px-5 flex-shrink-0"
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
    <div className="flex flex-col gap-8">
      {/* Drawer with dynamic content */}
      <SettingsDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={drawerTitle}>
        {drawerContent}
      </SettingsDrawer>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Settings</h1>

      <div>
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