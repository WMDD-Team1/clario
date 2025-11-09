import React, { useState } from "react";
import Button from "@/components/Button";
import successImg from "@/assets/icons/client-upload-success.svg"; 
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';

interface Props {
  onClose: () => void;
}

const ChangeEmail: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!email.trim() || !confirmEmail.trim()) {
      setError('Please fill in both fields');
      return;
    }

    if (email !== confirmEmail) {
      setError('Emails do not match');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const updated = await updateUserProfile({ email });
      dispatch(updateUser(updated.data));
      setIsSaved(true);
      setError(null);
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to update email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
    if (error) setError(null);
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
    <div className="flex flex-col h-full">
      
      <div className="flex-1 flex flex-col justify-top">
        {!isSaved ? (
          <>
            <div className="relative mb-6">
              <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
                New Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
                Confirm Email
              </label>
              <input
                type="text"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          
          <div className="flex flex-1 justify-center items-center">
            <img
              src={successImg}
              alt="Success"
              className="w-28 h-28 object-contain"
            />
          </div>
        )}
      </div>

      
      {!isSaved ? (
        <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 md:rounded-bl-[50px] mt-auto">
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
          >
            Save
          </Button>
        </div>
      ) : (
        <div className="flex justify-between bg-[var(--background-alternate)] -m-5 md:rounded-bl-[50px] p-5">
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
  );
};

export default ChangeEmail;
