import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import TextArea from '@components/TextArea';
import { useDispatch } from 'react-redux';
import { updateIncomeCategories } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';

interface Props {
  onClose: () => void;
  incCategories: string[];
}

const IncomeCategories: React.FC<Props> = ({ onClose, incCategories }) => {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [categories, setCategories] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize categories with comma-separated values
  useEffect(() => {
    if (incCategories.length > 0) {
      setCategories(incCategories.join(', '));
    }
  }, [incCategories]);

  const handleSave = async () => {
    const trimmed = categories
      .split(',')
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0);

    if (trimmed.length === 0) {
      setError('Please enter at least one category.');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const { message, categories } = await updateIncomeCategories(trimmed);

      dispatch(updateUser({ settings: { finance: { incomeCategories: categories } } }));

      setIsSaved(true);
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.message || 'Failed to update income categories.';
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
          <TextArea
            id="categories"
            label="Edit Categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="p-5 rounded-lg border-2 border-gray-300 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            color="text-gray-500 bg-white"
          />
          <span>Separate the categories with “,”</span>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
      </>
    </div>
  );
};

export default IncomeCategories;
