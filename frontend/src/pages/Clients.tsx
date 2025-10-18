import React, { useEffect, useState } from 'react';
import Card from '@components/Card';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth0 } from '@auth0/auth0-react';
import { fontSizeOptions } from '@components/style/font';
import { colorOptions } from '@components/style/color';
import TextArea from '@components/TextArea';

const Clients = () => {
  const [clients, setClients] = useState<{ data: any[]; meta: any }>({
    data: [],
    meta: {},
  });
  const [slide, setSlide] = useState('100%');
  const { getAccessTokenSilently } = useAuth0();

  const fetchClients = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    console.log(token);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  //--Get data from form--------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    // Change the input name after finshing new input----------------------------
    const payload = {
      name: formData.get('clientName'),
      email: formData.get('clientEmail'),
      phone: formData.get('phone'),
      address: {
        street: formData.get('clientAddress'),
        postalCode: formData.get('postalCode'),
        city: formData.get('city'),
        country: formData.get('country'),
      },
      notes: formData.get('notes'),
    };

    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    console.log(token);
    console.log('--------');
    console.log(payload);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log(responseText);

      if (!response.ok) throw new Error('Failed to save client');
      form.reset();
      await fetchClients();
      setSlide('100%');
    } catch (error) {
      console.log(error);
    }
  };

  const testData = [
    {
      name: 'Alice Johnson',
      phone: '123-456-7890',
      email: 'alice@example.com',
      country: 'Canada',
      invoices: 12,
      projects: 5,
    },
    {
      name: 'Bob Smith',
      phone: '987-654-3210',
      email: 'bob@example.com',
      country: 'USA',
      invoices: 8,
      projects: 3,
    },
    {
      name: 'Charlie Lee',
      phone: '555-666-7777',
      email: 'charlie@example.com',
      country: 'UK',
      invoices: 5,
      projects: 2,
    },
    {
      name: 'Diana Prince',
      phone: '111-222-3333',
      email: 'diana@example.com',
      country: 'Australia',
      invoices: 15,
      projects: 7,
    },
    {
      name: 'Ethan Hunt',
      phone: '444-555-6666',
      email: 'ethan@example.com',
      country: 'Germany',
      invoices: 9,
      projects: 4,
    },
  ];

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center gap-[2rem]">
          <h2 className="text-2xl">My Work</h2>
          <div className="flex flex-row gap-[.5rem] justify-between items-center p-[.5rem] bg-gray-200 rounded-[1rem]">
            <p className="rounded-[1rem] pt-[.5rem] pb-[.5rem] pl-[2rem] pr-[2rem]">All Projects</p>
            <p className="bg-white rounded-[1rem] pt-[.5rem] pb-[.5rem] pl-[2rem] pr-[2rem]">
              All Clients
            </p>
          </div>
        </div>
        <Button
          buttonColor="regularButton"
          onClick={() => setSlide('0px')}
          textColor="white"
          width="200px"
        >
          Add Client
        </Button>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[1rem]">
        <div className="flex flex-col flex-nowrap items-center justify-center bg-gray-100 rounded-[1rem] pt-[1rem] pb-[1rem] pl-[2rem] pr-[2rem] flex-1 gap-[.5rem]">
          <p>Total</p>
          <p>$12000</p>
        </div>
        <div className="flex flex-col flex-nowrap items-center justify-center bg-gray-100 rounded-[1rem] pt-[1rem] pb-[1rem] pl-[2rem] pr-[2rem] flex-1 gap-[.5rem]">
          <p>Active</p>
          <p>$8000</p>
        </div>
        <div className="flex flex-col flex-nowrap items-center justify-center bg-gray-100 rounded-[1rem] pt-[1rem] pb-[1rem] pl-[2rem] pr-[2rem] flex-1 gap-[.5rem]">
          <p>Inactive</p>
          <p>10</p>
        </div>
        <div className="flex flex-col flex-nowrap items-center justify-center bg-gray-100 rounded-[1rem] pt-[1rem] pb-[1rem] pl-[2rem] pr-[2rem] flex-1 gap-[.5rem]">
          <p>Archive</p>
          <p>5</p>
        </div>
        <div className="flex flex-col flex-nowrap items-center justify-center bg-gray-100 rounded-[1rem] pt-[1rem] pb-[1rem] pl-[2rem] pr-[2rem] flex-1 gap-[.5rem]">
          <p>Clients</p>
          <p>30</p>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap items-center justify-start gap-[1rem]">
        <div className="w-[20rem]">
          <Input placeholder="Search client" />
        </div>
        <Input placeholder="Sort By"></Input>
      </div>

      <div className='rounded-[20px] border overflow-hidden border-gray-200'>
      <table className="text-center w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-4">Client Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Invoices</th>
            <th className="px-4 py-2">Total Projects</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {testData.map((client, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="text-left px-4 py-[1rem] border-t border-gray-200">{client.name}</td>
              <td className="px-4 border-t border-gray-200">{client.phone}</td>
              <td className="px-4 border-t border-gray-200">{client.email}</td>
              <td className="px-4 border-t border-gray-200">{client.country}</td>
              <td className="px-4 border-t border-gray-200">{client.invoices}</td>
              <td className="px-4 border-t border-gray-200">{client.projects}</td>
              <td className="px-4 border-t border-gray-200">...</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div
        className={`fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300 overflow-y-auto rounded-tl-[20px] rounded-bl-[20px]`}
        style={{ transform: `translateX(${slide})`, width: '450px' }}
      >
        <h2
          className={`text-[${fontSizeOptions.h2}] text-center bg-blue-50 p-[1rem] sticky top-0 z-10`}
        >
          Add Client
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-between">
          <div className="flex flex-col gap-[1.5rem] p-[2rem]">
            <Input color="bg-white" label="Client Name" name="clientName"></Input>
            <Input color="bg-white" label="Phone" name="phone"></Input>
            <Input color="bg-white" label="Email" name="clientEmail" type="email"></Input>
            <TextArea label="Notes" color="bg-white" name="notes"></TextArea>

            <p>Client's Address</p>
            <Input color="bg-white" label="Street Address" name="clientAddress"></Input>
            <Input color="bg-white" label="Postal Code" name="postalCode"></Input>
            <Input color="bg-white" label="City" name="city"></Input>
            <Input color="bg-white" label="Country" name="country"></Input>
          </div>

          <div
            className="flex flex-row justify-center gap-[1rem] sticky
          bottom-0 w-full p-[2rem] bg-blue-50"
          >
            <Button buttonColor="regularButton" type="submit" width="100%" textColor="white">
              Add
            </Button>
            <Button
              buttonColor="regularButton"
              onClick={() => setSlide('100%')}
              width="100%"
              textColor="white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Clients;
