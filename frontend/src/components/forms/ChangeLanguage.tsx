import React, { useState } from 'react';
import Button from '@/components/Button';
import successImage from '@/assets/icons/client-upload-success.svg';
import { updateUserPreferences } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import { useDispatch } from 'react-redux';
import SuccessForm from './SuccessForm';

interface Props {
  onClose: () => void;
}

const ChangeLanguage: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState<'' | 'en' | 'fr'>('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!language) {
      setError('Please select a language.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await updateUserPreferences({ language });
      dispatch(updateUser(res.data));

      // onClose();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update language.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess)
    return (
      <SuccessForm
        iconPath="/setting-update-success.svg"
        title="Language changed!"
        message="Your language preference has been updated successfully."
        onCancel={onClose}
      />
    );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'en' || value === 'fr' || value === '') {
      setLanguage(value);
    }
  };

  return (
    <form className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-top">
        <div className="relative mb-6">
          <label className="absolute -top-2.5 left-4 bg-[var(--general-alpha)] px-1 text-sm text-gray-500">
            Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage('en')}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>
              Select a language
            </option>
            <option value="english">English</option>
            <option value="french">French</option>
          </select>
        </div>

        <div className="flex justify-between gap-2 absolute bottom-0 right-0 left-0 p-[30px] bg-[var(--primitive-colors-brand-primary-75)] rounded-bl-[50px]">
          <Button
            onClick={onClose}
            className="py-4 mr-2"
            buttonColor="white"
            textColor="black"
            width="48%"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="py-4 ml-2"
            buttonColor="regularButton"
            textColor="white"
            width="48%"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangeLanguage;
