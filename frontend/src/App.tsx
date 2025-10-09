import { useEffect, useState } from 'react';
import { getText } from './api';
import Button from '@components/Button';
import Input from '@components/Input';
import Card from '@components/Card';

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-green-800 text-4xl font-extrabold">This is TEST.</h1>

      <h2 className="mt-4">
        Communication with Backend: <span className="text-red-500">{text}</span>
      </h2>
      <Input label='Name' placeholder='Please input your name'/>

      <Button/>
      <Card cardTitle="AI Design Assistant"
  cardDescription="A smart tool to help you quickly generate visual designs and web layouts."
  buttonName="Learn More"
  buttonLink="https://example.com"/>
    </div>
  );
}

export default App;
