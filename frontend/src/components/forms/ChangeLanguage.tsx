import React, { useState } from 'react';
import Button from '@/components/Button';
import successImage from '@/assets/icons/client-upload-success.svg';
import { updateUserPreferences } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import { useDispatch } from 'react-redux';
import SuccessForm from './SuccessForm';
import Select from '@components/Select';

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
          <Select
            id="language"
            label="Language"
            value={language}
            onChange={(val) => setLanguage(val as 'en' | 'fr')}
            options={['en', 'fr']}
            placeHolder="Select a language"
            color="var(--secondary-text)"
            width="100%"
          />
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
