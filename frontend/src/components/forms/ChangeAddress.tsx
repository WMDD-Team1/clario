import React, { useState } from 'react';
import Button from '@/components/Button';
import { updateUserProfile } from '@api/services/settingService';
import { useDispatch } from 'react-redux';
import { updateUser } from '@store/userSlice';

interface Props {
  onClose: () => void;
}

const ChangeAddress: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    if (!street.trim() || !city.trim() || !country.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const updated = await updateUserProfile({
        address: {
          street,
          city,
          postalCode,
          country,
        },
      });
      dispatch(updateUser(updated.data));
      setIsSaved(true);
      setError(null);
      onClose();
    } catch (err: any) {
      console.error('Error updating address:', err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to update address. Please try again.');
      }
    } finally {
      setLoading(false);
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
  const clearErrorOnInput = () => {
    if (error) setError(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-top">
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            Address Line
          </label>
          <input
            type="text"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              clearErrorOnInput();
            }}
            placeholder="1645 SW Marine Drive"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            City
          </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            Country
          </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              clearErrorOnInput();
            }}
            placeholder="V5K 0A1"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              clearErrorOnInput();
            }}
            placeholder="Vancouver"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              clearErrorOnInput();
            }}
            placeholder="Canada"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <>
        {!isSaved ? (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-6 p-5 rounded-bl-[50px]">
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
      </>
    </div>
  );
};

export default ChangeAddress;
