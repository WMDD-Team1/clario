import React, { useState } from "react";
import Button from "@/components/Button";
import successImage from "@/assets/icons/client-upload-success.svg";
import { updateUserPreferences } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import { useDispatch } from 'react-redux';

interface Props {
  onClose: () => void;
}

const ChangeLanguage: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [language, setLanguage] = useState<'' | 'en' | 'fr'>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      setIsSaved(true);
      // onClose();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update language.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'en' || value === 'fr' || value === '') {
      setLanguage(value);
    }
  };
  const handleCancel = () => {
    console.log('Cancelled');
    onClose();
  };

  const handleClose = () => {
    console.log('Closed');
    onClose();
    setIsSaved(false);
  };

  return (
    <div className="relative flex flex-col h-full">
      {isSaved && (
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <img
            src={successImage}
            alt="Success"
            className="w-40 h-40 object-contain"
          />
        </div>
      )}

      {!isSaved && (
        <div className="flex-1 flex flex-col justify-top z-10">
          <div className="relative mb-6">
            <label className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500">
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
              <option value="spanish">Spanish</option>
              <option value="german">German</option>
              <option value="hindi">Hindi</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="korean">Korean</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 md:rounded-bl-[50px] z-20 mt-auto">
        {!isSaved ? (
          <>
            <Button
              onClick={handleCancel}
              className="py-4 mr-2"
              buttonColor="white"
              textColor="black"
              width="48%"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="py-4 ml-2"
              buttonColor="regularButton"
              textColor="white"
              width="48%"
              disabled={!language}
            >
              Save
            </Button>
          </>
        ) : (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-6 rounded-bl-[50px] p-5">
            <Button
              onClick={handleClose}
              className="w-full py-4"
              buttonColor="regularButton"
              textColor="white"
              width="98%"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeLanguage;
