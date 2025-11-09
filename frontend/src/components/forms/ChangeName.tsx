import React, { useState } from "react";
import Button from "@/components/Button";
import successImg from "@/assets/icons/client-upload-success.svg"; 

import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';

interface Props {
  onClose: () => void;
}

const ChangeName: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [name, setName] = useState('');

  const handleSave = async () => {
    if (!name.trim()) return;
    setLoading(true);
    const updated = await updateUserProfile({ name });
    dispatch(updateUser(updated.data));
    setLoading(false);
    onClose();
    setIsSaved(true);
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
      {/* MAIN SECTION */}
      <div className="flex-1 flex flex-col justify-top">
        {!isSaved ? (
          <>
            <div className="relative mb-6">
              <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

      {/* FOOTER BUTTONS */}
      {!isSaved ? (
        <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 md:rounded-bl-[50px] mt-auto">
          <Button
            onClick={handleCancel}
            className="py-4 mr-2"
            buttonColor="white"
            textColor="black"
            width="46%"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="py-4 ml-2"
            buttonColor="regularButton"
            textColor="white"
            width="46%"
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
            width="96%"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeName;
