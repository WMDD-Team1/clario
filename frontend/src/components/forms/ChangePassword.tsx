import React, { useState } from "react";
import Button from "@/components/Button";
import successImage from "@/assets/icons/client-upload-success.svg"; 

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { updateUserPassword } from '@api/services/settingService';
import SuccessForm from './SuccessForm';
interface Props {
  onClose: () => void;
}

const ChangePassword: React.FC<Props> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = async () => {
    setError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      setLoading(true);
      const res = await updateUserPassword({ currentPassword, newPassword });
      if (res?.message) {
        setIsSuccess(true);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update password.';
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
        title="Password updated!"
        message="Your password has been changed successfully."
        onCancel={onClose}
      />
    );
  return (
    <form className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-top">
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            Current Password
          </label>
          <input
            type={showCurrent ? 'text' : 'password'}
            placeholder="Enter Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-4 top-3.5 text-blue-500 cursor-pointer text-lg"
            onClick={() => setShowCurrent(!showCurrent)}
          >
            {showCurrent ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>

        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            New Password
          </label>
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-4 top-3.5 text-blue-500 cursor-pointer text-lg"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>

        <div className="relative">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            Confirm New Password
          </label>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-4 top-3.5 text-blue-500 cursor-pointer text-lg"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
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
    </form>
  );
};

export default ChangePassword;
