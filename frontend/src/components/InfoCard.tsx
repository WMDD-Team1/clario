import { ExpenseItem } from '@api/types/dashboardApi';
import { formatDate } from '@utils/formatDate';
import { formatCurrency } from '@utils/formatCurrency';
import React from 'react';

interface InfoRowProps {
  expense: ExpenseItem;
  vertical?: boolean;
}
const InfoCard: React.FC<InfoRowProps> = ({ expense }) => {
  const { title, amount, category, date } = expense;
  return (
    <div className={'flex justify-between items-center py-2 border-gray-200'}>
      <div>
        <span>{title}</span>
        <br />
        <span>{formatDate(date)}</span>
      </div>
      <div>CAD {formatCurrency(amount, 0) || '-'}</div>
    </div>
  );
};

export default InfoCard;
