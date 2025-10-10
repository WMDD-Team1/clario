import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import Card from '@components/Card';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth0 } from '@auth0/auth0-react';

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
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('clientName'),
      type: formData.get('clientType'),
      email: formData.get('clientEmail'),
      contact: formData.get('clientContact'),
      address: formData.get('clientAddress'),
      description: 'clientDescp',
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save client');
      const data = await response.json();
      console.log(data);
      form.reset();
      await fetchClients();
      setSlide('100%');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={() => setSlide('0px')}>Add Client</Button>

      <form
        onSubmit={handleSubmit}
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 p-6`}
        style={{ transform: `translateX(${slide})`, width: '400px' }}
      >
        <div className="flex flex-col gap-4">
          <Input label="Client Name" name="clientName"></Input>
          <Input label="Client Type" name="clientType"></Input>
          <Input label="Client Description" name="clientDescp"></Input>
          <Input label="Contact" name="clientContact"></Input>
          <Input label="E-mail" name="clientEmail"></Input>
          <Input label="Address" name="clientAddress"></Input>
        </div>
        <div>
          <Button onClick={() => setSlide('100%')}>Back</Button>
          <Button type="submit" onClick={() => {}}>
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Clients;
