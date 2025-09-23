import { useEffect, useState } from 'react';
import { getText } from './api';
import Button from '@components/Button';

const App = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    const fetchText = async () => {
      const result = await getText();  // wait for the string
      setText(result);
    };

    fetchText();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-green-800 text-4xl font-extrabold">This is TEST.</h1>

      <h2 className="mt-4">
        Communication with Backend: <span className="text-red-500">{text}</span>
      </h2>

      <Button />
    </div>
  );
};

export default App;
