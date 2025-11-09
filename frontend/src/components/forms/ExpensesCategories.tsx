import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import TextArea from '@components/TextArea';
import { useDispatch } from 'react-redux';
import { updateExpenseCategories } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import SuccessForm from './SuccessForm';

interface Props {
  onClose: () => void;
  expenseCategories: string[];
}

const ExpensesCategories: React.FC<Props> = ({ onClose, expenseCategories }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (expenseCategories.length > 0) {
      setCategories(expenseCategories.join(', '));
    }
  }, [expenseCategories]);
  const handleSave = async () => {
    const trimmed = categories
      .split(',')
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0);

    if (trimmed.length === 0) {
      setError('Please enter at least one category.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { categories: updatedCategories } = await updateExpenseCategories(trimmed);
      dispatch(updateUser({ settings: { finance: { expenseCategories: updatedCategories } } }));
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error updating categories:', err);
      const message = err.response?.data?.message || 'Failed to update expense categories.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess)
    return (
      <SuccessForm
        iconPath="/setting-update-success.svg"
        title="Expense categories updated!"
        message="Your expense categories have been updated successfully."
        onCancel={onClose}
      />
    );

  return (
    <form className="flex flex-col h-full">
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
        </div>{' '}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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

export default ExpensesCategories;
