import React, { useState } from 'react';
import Button from '@/components/Button';
import successImage from '@/assets/icons/client-upload-success.svg';
import { updateUserProfile } from '@api/services/settingService';
import { useDispatch } from 'react-redux';
import { updateUser } from '@store/userSlice';
import SuccessForm from './SuccessForm';
import Input from '@components/Input';

interface Props {
  onClose: () => void;
}

const ChangeAddress: React.FC<Props> = ({ onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const clearErrorOnInput = () => {
    if (error) setError(null);
  };

  const handleSave = async () => {
    if (!street.trim() || !city.trim() || !postalCode.trim() || !country.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

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
      setIsSuccess(true);
      setIsSaved(true);
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

  if (isSuccess)
    return (
      <SuccessForm
        iconPath="/setting-update-success.svg"
        title="Address updated!"
        message="Your address has been updated successfully."
        onCancel={onClose}
      />
    );

  const handleCancel = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
    setIsSaved(false);
  };

  return (
    <form className="relative flex flex-col h-full">
      {isSaved && (
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <img src={successImage} alt="Success" className="w-40 h-40 object-contain" />
        </div>
      )}

      {!isSaved && (
        <div className="flex-1 flex flex-col justify-top z-10">
          <div className="relative mb-6">
            <Input
              label="Address Line"
              id="street"
              value={street}
              placeholder="1645 SW Marine Drive"
              onChange={(e) => {
                setStreet(e.target.value);
                clearErrorOnInput();
              }}
            />
          </div>

          <div className="relative mb-6">
            <Input
              label="City"
              id="city"
              value={city}
              placeholder="Vancouver"
              onChange={(e) => {
                setCity(e.target.value);
                clearErrorOnInput();
              }}
            />
          </div>

          <div className="relative mb-6">
            <Input
              label="Postal Code"
              id="postalCode"
              value={postalCode}
              placeholder="V5K 0A1"
              onChange={(e) => {
                setPostalCode(e.target.value);
                clearErrorOnInput();
              }}
            />
          </div>

          <div className="relative mb-6">
            <Input
              label="Country"
              id="country"
              value={country}
              placeholder="Canada"
              onChange={(e) => {
                setCountry(e.target.value);
                clearErrorOnInput();
              }}
            />
          </div>

          {error && <p className="text-[var(--error-accent1)] text-sm mb-4">{error}</p>}
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
              disabled={loading}
              className="py-4 ml-2"
              buttonColor="regularButton"
              textColor="white"
              width="48%"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </>
        ) : (
          <Button
            onClick={handleClose}
            className="w-full py-4"
            buttonColor="regularButton"
            textColor="white"
            width="98%"
          >
            Close
          </Button>
        )}
      </div>
    </form>
  );
};

export default ChangeAddress;
