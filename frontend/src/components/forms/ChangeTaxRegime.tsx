import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';
import { updateFinanceSettings } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';

interface Props {
  onClose: () => void;
  tax: string;
}

const ChangeTaxRegime: React.FC<Props> = ({ onClose, tax }) => {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [taxRegime, setTaxRegime] = useState<'' | 'British Columbia' | 'Quebec'>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tax === 'British Columbia' || tax === 'Quebec') {
      setTaxRegime(tax);
    } else {
      setTaxRegime('');
    }
  }, [tax]);

  const handleSave = async () => {
    if (!taxRegime) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await updateFinanceSettings({ province: taxRegime });
      console.log(data.province);
      dispatch(updateUser({ settings: { finance: { province: data.province } } }));

      setIsSaved(true);
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.message || 'Failed to update tax regime.';
      setError(message);
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-top">
        <div className="relative mb-6">
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500">
            Tax Regime
          </label>

          <select
            value={taxRegime}
            onChange={(e) => setTaxRegime(e.target.value as 'British Columbia' | 'Quebec')}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>
              Select your Tax Regime
            </option>
            <option value="British Columbia">British Columbia</option>
            <option value="Quebec">Quebec</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <>
        {!isSaved ? (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 md:rounded-bl-[50px]">
            <Button
              onClick={handleCancel}
              className="py-4 mr-2"
              buttonColor="white"
              textColor="black"
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
              disabled={!taxRegime || loading}
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

export default ChangeTaxRegime;
