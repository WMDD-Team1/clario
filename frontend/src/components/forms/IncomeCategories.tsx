import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import TextArea from "@components/TextArea";
import { useDispatch } from 'react-redux';
import { updateIncomeCategories } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import SuccessForm from './SuccessForm';

interface Props {
  onClose: () => void;
  incCategories: string[];
}

const IncomeCategories: React.FC<Props> = ({ onClose, incCategories }) => {
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize categories with comma-separated values
  useEffect(() => {
    if (incCategories.length > 0) {
      setCategories(incCategories.join(", "));
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

    setError(null);
    setLoading(true);

    try {
      const { categories: updatedCategories } = await updateIncomeCategories(trimmed);
      dispatch(updateUser({ settings: { finance: { incomeCategories: updatedCategories } } }));
      setIsSuccess(true);
      setIsSaved(true);
    } catch (err: any) {
      console.error('Error updating categories:', err);
      const message = err.response?.data?.message || 'Failed to update income categories.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess)
    return (
      <SuccessForm
        iconPath="/setting-update-success.svg"
        title="Income categories updated!"
        message="Your income categories have been updated successfully."
        onCancel={onClose}
      />
    );

  const handleCancel = () => {
    console.log("Cancelled");
    onClose();
  };

  const handleClose = () => {
    console.log("Closed");
    onClose();
    setIsSaved(false);
  };

  return (
    <form className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-top">
        <div className="relative mb-6 text-[var(--page-title)]">
          <TextArea
            id="categories"
            label="Edit Categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="p-5 rounded-lg border-2 border-[var(--sublight)] text-[var(--page-title)] w-full resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-alpha)]"
            color="text-[var(--border)] bg-white"
          />
          <span className="text-[var(--page-title)]">Separate the categories with “,”</span>
        </div>

      </div>

      <>
        {!isSaved ? (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 rounded-bl-[50px]">
            <Button
              onClick={handleCancel}
              className="py-4 mr-2"
              buttonColor="white"
              textColor="var(--primary-text)"
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
    </form>
  );
};

export default IncomeCategories;