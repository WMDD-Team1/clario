import { useEffect, useState } from 'react';
import { getText } from './api';
import Button from '@components/Button';
import Input from '@components/Input';
import Card from '@components/Card';
import Modal from '@components/Modal';
import { colorOptions } from '@components/style/color';

const App = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    const fetchText = async () => {
      const result = await getText();  // wait for the string
      setText(result);
    };

    fetchText();
  }, []);

  const modalData = {
  isOpen: false,
  title: "Delete Confirmation",
  description: "Are you sure you want to delete this item? This action cannot be undone.",
  buttonName: "Confirm",
  onClose: () => console.log("Modal closed"),
};

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-green-800 text-4xl font-extrabold">This is TEST.</h1>

      <h2 className="mt-4">
        Communication with Backend: <span className="text-red-500">{text}</span>
      </h2>
      <Input label='Name' placeholder='Please input your name' color={colorOptions.white} borderColor={colorOptions.black}/>

      <Button style='lightButton' buttonName='submit' width='20rem'/>
      <Card cardTitle="AI Design Assistant"
  cardDescription="A smart tool to help you quickly generate visual designs and web layouts."
  buttonName="Learn More"
  buttonLink="https://example.com"
  style='card1'/>
  <Modal
  isOpen={modalData.isOpen}
  title={modalData.title}
  description={modalData.description}
  buttonName={modalData.buttonName}
  onClose={modalData.onClose}
  buttonStyle='blueButton'
/>
    </div>
  );
};

export default App;
