import React, { useState } from "react";
import Button from "@/components/Button";
import successImg from "@/assets/icons/client-upload-success.svg"; 

import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import SuccessForm from './SuccessForm';

interface Props {
  onClose: () => void;
}

const ChangeName: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');

  const handleSave = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const updated = await updateUserProfile({ name });
      dispatch(updateUser(updated.data));
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error updating name:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess)
    return (
      <SuccessForm
        iconPath="/setting-update-success.svg"
        title="Name changed!"
        message="Your name has been updated successfully."
        onCancel={onClose}
      />
    );

  return (
    <form className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-start">
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            name="name"
            placeholder="Rosa Larruborosa"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
          className="py-4 ml-2"
          buttonColor="regularButton"
          textColor="white"
          width="48%"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default ChangeName;
