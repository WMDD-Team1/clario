import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { updateUserPreferences } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import SuccessForm from './SuccessForm';
import { RootState } from '@store/index';
import Select from '@components/Select';

interface Props {
  onClose: () => void;
}

const ChangeMode: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark' | null) ||
      user?.settings?.general?.theme ||
      'light';

    setMode(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [user]);

  const handleSave = async () => {
    if (!mode) {
      setError('Please select a display mode.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await updateUserPreferences({ theme: mode });
      dispatch(updateUser(res.data));
      document.documentElement.setAttribute('data-theme', mode);
      localStorage.setItem('theme', mode);
      setIsSuccess(true);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update mode.';
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
        title="Display mode changed!"
        message="Your theme mode has been updated successfully."
        onCancel={onClose}
      />
    );

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'light' || value === 'dark') {
      setMode(value);
    }
    if (error) setError(null);
  };

  return (
    <form className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-start">
        <div className="relative mb-6">
          <Select
            id="displayMode"
            label="Display Mode"
            value={mode}
            onChange={(value) => {
              setMode(value as 'light' | 'dark');
              if (error) setError(null);
            }}
            options={['light', 'dark']}
            placeHolder="Select a display mode"
            color="var(--secondary-text)"
            width="100%"
          />
          {error && <p className="text-[var(--error-accent1)] text-sm mt-2">{error}</p>}
        </div>
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
          disabled={loading || !mode}
          className="py-4 ml-2"
          buttonColor="regularButton"
          textColor="white"
          width="48%"
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default ChangeMode;
