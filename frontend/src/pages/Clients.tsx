import React, { useEffect, useState } from 'react';
import Card from '@components/Card';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth0 } from '@auth0/auth0-react';
import { fontSizeOptions } from '@components/style/font';

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
    const payload = {
      name: formData.get('clientName'),
      type: formData.get('clientType'),
      email: formData.get('clientEmail'),
      contact: formData.get('clientContact'),
      address: formData.get('clientAddress'),
      description: formData.get('clientDescp'),
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

  return (
    <>
      <div className="flex flex-row justify-end p-[1rem]">
        <Button buttonColor="regularButton" onClick={() => setSlide('0px')}>
          Add Client
        </Button>
      </div>
      <div className="m-auto p-[1rem]">
        <div className="flex flex-row flex-wrap gap-[1rem] justify-start w-full">
          {clients.data.map((client) => (
            <div className="w-[calc((100%-2rem)/3)]">
              <Card style="card1">
                <div className="flex flex-row justify-between mb-[1rem]">
                  <div className="flex flex-col justify-center items-left gap-4">
                    <div>
                      <h2>Name</h2>
                      <p className="text-2xl">{client.name}</p>
                    </div>

                    <div>
                      <h2>Type</h2>
                      <p className="text-2xl">{client.type}</p>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <h2 className={`text-[${fontSizeOptions.h2}] font-semibold`}>5</h2>
                    <p className="text-2xl">Projects</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300`}
        style={{ transform: `translateX(${slide})`, width: '400px' }}
      >
        <div className='p-[1rem]'>
        <h2 className={`text-[${fontSizeOptions.h2}] text-center bg-white`}>Add Client</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 h-full"
        >
          <div className="flex flex-col gap-4">
            <Input color="bg-white" label="Client Name" name="clientName"></Input>
            <Input color="bg-white" label="Client Type" name="clientType"></Input>
            <Input color="bg-white" label="Client Description" name="clientDescp"></Input>
            <Input color="bg-white" label="Contact" name="clientContact"></Input>
            <Input color="bg-white" label="E-mail" name="clientEmail" type="email"></Input>
            <Input color="bg-white" label="Address" name="clientAddress"></Input>
          </div>
          <div className="flex flex-row justify-center gap-[1rem] mt-[2rem]">
            <Button buttonColor="regularButton" onClick={() => setSlide('100%')} width="100%">
              Back
            </Button>
            <Button buttonColor="regularButton" type="submit" width="100%">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Clients;
