import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateFinanceSettings } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import { RootState } from '@store/index';
import SuccessForm from './SuccessForm';
import Select from '@components/Select';

interface Props {
  onClose: () => void;
  tax: string;
}

const ChangeTaxRegime: React.FC<Props> = ({ onClose, tax }) => {
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const currentProvince = user?.settings?.finance?.province;

  const [taxRegime, setTaxRegime] = useState<'British Columbia' | 'Quebec'>('British Columbia');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tax === 'Quebec' || currentProvince === 'Quebec') {
      setTaxRegime('Quebec');
    } else {
      setTaxRegime('British Columbia');
    }
  }, [tax, currentProvince]);

  const handleSave = async () => {
    if (!taxRegime) {
      setError('Please select a tax regime.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await updateFinanceSettings({ province: taxRegime });
      dispatch(updateUser({ settings: { finance: { province: data.province } } }));
      setIsSuccess(true);
      setIsSaved(true);
    } catch (err: any) {
      console.error('Error updating tax regime:', err);
      const message = err.response?.data?.message || 'Failed to update tax regime.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  if (isSuccess)
    return (
      <SuccessForm
        iconPath="/setting-update-success.svg"
        title="Tax regime updated!"
        message="Your tax province has been updated successfully."
        onCancel={onClose}
      />
    );

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
    <form className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-top">
        <div className="relative mb-6">
          <Select
            id="taxRegime"
            label="Tax Regime"
            value={taxRegime}
            onChange={(value) => {
              setTaxRegime(value as 'British Columbia' | 'Quebec');
              if (error) setError(null);
            }}
            options={['British Columbia', 'Quebec']}
            placeHolder="Select your Tax Regime"
            color="var(--secondary-text)"
            width="100%"
          />
        </div>
        {error && <p className="text-[var(--error-accent1)] text-sm mt-2">{error}</p>}
      </div>

      <>
        {!isSaved ? (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 md:rounded-bl-[50px]">
            <Button
              onClick={handleCancel}
              className="py-4 mr-2"
              buttonColor="white"
              textColor="var(--primary-text)"
              width="48%"
              disabled={loading}
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
        ) : (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-5 rounded-bl-[50px] p-5">
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
    </form>
  );
};

export default ChangeTaxRegime;
