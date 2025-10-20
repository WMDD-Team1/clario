import React, { useEffect, useState } from 'react';
// import Card from '@components/Card';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth0 } from '@auth0/auth0-react';
import { fontSizeOptions } from '@components/style/font';
// import { colorOptions } from '@components/style/color';
import TextArea from '@components/TextArea';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Clients = () => {
  interface Project {
    _id: string;
    name: string;
  }

  interface Address {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  }

  interface Client {
    id: string;
    name: string;
    type: 'Individual' | 'Company';
    email: string;
    phone: string;
    address: Address;
    notes: string;
    isArchived: boolean;
    projectCount: number;
    invoiceCount: number;
    projects: Project[];
    createdAt: string;
    updatedAt: string;
  }

  interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }

  interface ClientResponse {
    data: Client[];
    meta: Meta;
  }

  const [clients, setClients] = useState<ClientResponse>({
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  });

  const [oneClient, setOneClient] = useState<Client>({
    id: '',
    name: '',
    type: 'Individual',
    email: '',
    phone: '',
    address: { street: '', postalCode: '', city: '', country: '' },
    notes: '',
    isArchived: false,
    projectCount: 0,
    invoiceCount: 0,
    projects: [],
    createdAt: '',
    updatedAt: '',
  });

  const [slide, setSlide] = useState('100%');

  const [slideDetail, setSlideDetail] = useState('100%');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [clientId, setClientId] = useState('');

  const [pageWindowStart, setPageWindowStart] = useState(1);
  const PAGE_WINDOW_SIZE = 5;
  const { getAccessTokenSilently } = useAuth0();

  //--Get data from form--------------------------
  const fetchClients = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    // console.log(token);

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/clients?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.data;
    console.log(data);
    setClients(data);
  };

  const fetchOneClient = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    // console.log(token);

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/clients/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    console.log(data);
    setOneClient(data);
  };

  const deleteClient = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    // console.log(token);

    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/clients/${clientId}/archive`,
      {
        isArchived: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.data;
    console.log(data);
    await fetchClients();
    setSlideDetail('100%');
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage]);

  useEffect(() => {
    fetchOneClient();
  }, [clientId]);

  interface FormData {
    name: string | null;
    email: string | null;
    type: 'Individual' | 'Company';
    phone: string | null;
    address: Address;
    notes: string | null;
  }
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      type: 'Individual', // Need to confirm with designers
      phone: formData.phone,
      address: {
        street: formData.address.street,
        postalCode: formData.address.postalCode,
        city: formData.address.city,
        country: formData.address.country,
      },
      notes: formData.notes,
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
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/clients`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      reset();
      await fetchClients();
      setSlide('100%');
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

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

      <div className="rounded-[20px] border overflow-hidden border-gray-200">
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
            {clients.data
              .filter((c) => c.isArchived == false)
              .map((client, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="text-left px-4 py-[1rem] border-t border-gray-200">
                    {client.name}
                  </td>
                  <td className="px-4 border-t border-gray-200">{client.phone}</td>
                  <td className="px-4 border-t border-gray-200">{client.email}</td>
                  <td className="px-4 border-t border-gray-200">{client.address.country}</td>
                  <td className="px-4 border-t border-gray-200">{client.invoiceCount}</td>
                  <td className="px-4 border-t border-gray-200">{client.projectCount}</td>
                  <td
                    className="px-4 border-t border-gray-200"
                    onClick={() => {
                      setSlideDetail('0px');
                      setClientId(client.id);
                    }}
                  >
                    ...
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="bg-gray-200 w-full p-[1rem] flex felx-row flex-nowrap justify-between items-center">
          <p>Total {clients.meta.total}</p>
          <div className="flex felx-row flex-nowrap justify-between items-center gap-[1rem]">
            <div
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  if (currentPage - 1 < pageWindowStart) {
                    setPageWindowStart(pageWindowStart - PAGE_WINDOW_SIZE);
                  }
                }
              }}
            >
              {'<'}
            </div>
            {Array.from({
              length: Math.min(PAGE_WINDOW_SIZE, clients.meta.totalPages - pageWindowStart + 1),
            }).map((_, i) => {
              const pageNumber = pageWindowStart + i;
              return (
                <div
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`flex justify-center items-center p-[.5rem] border border-gray-400 rounded-[5px] h-[25px] w-[25px] hover:bg-gray-300 ${currentPage === pageNumber ? 'bg-gray-400' : 'bg-gray-200'}`}
                >
                  {pageNumber}
                </div>
              );
            })}

            <div
              onClick={() => {
                if (currentPage < clients.meta.totalPages) {
                  setCurrentPage(currentPage + 1);
                  if (currentPage + 1 >= pageWindowStart + PAGE_WINDOW_SIZE) {
                    setPageWindowStart(pageWindowStart + PAGE_WINDOW_SIZE);
                  }
                }
              }}
            >
              {'>'}
            </div>
          </div>
        </div>
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-[1.5rem] p-[2rem]">
            <Input color="bg-white" label="Client Name" {...register('name')} />
            <Input color="bg-white" label="Phone" {...register('phone')} />
            <Input color="bg-white" label="Email" type="email" {...register('email')} />
            <TextArea label="Notes" color="bg-white" {...register('notes')} />

            <p>Client's Address</p>
            <Input color="bg-white" label="Street Address" {...register('address.street')} />
            <Input color="bg-white" label="Postal Code" {...register('address.postalCode')} />
            <Input color="bg-white" label="City" {...register('address.city')} />
            <Input color="bg-white" label="Country" {...register('address.country')} />
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
              onClick={() => {
                setSlide('100%');
                reset();
              }}
              width="100%"
              textColor="white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Client-details----------------------------------- */}
      <div
        className={`fixed top-0 right-0 h-full shadow-lg bg-white transition-transform duration-300 overflow-y-auto rounded-tl-[20px] rounded-bl-[20px]`}
        style={{ transform: `translateX(${slideDetail})`, width: '450px' }}
      >
        <h2
          className={`text-[${fontSizeOptions.h2}] text-center bg-blue-50 p-[1rem] sticky top-0 z-10`}
        >
          Client Details
        </h2>
        <div className="flex flex-col justify-between h-full">
          {oneClient && (
            <div className="p-[1rem]">
              <div className="flex flex-row justify-between items-center border-b-2 p-[1rem] border-gray-200">
                <p>Client Name</p>
                <p>{oneClient.name}</p>
              </div>
              <div className="flex flex-row justify-between items-center border-b-2 p-[1rem] border-gray-200">
                <p>Phone</p>
                <p>{oneClient.phone}</p>
              </div>
              <div className="flex flex-row justify-between items-center border-b-2 p-[1rem] border-gray-200">
                <p>Email</p>
                <p>{oneClient.email}</p>
              </div>

              <div className="flex flex-col gap-[1rem] items-start border-b-2 p-[1rem] border-gray-200">
                <p>Notes</p>
                <p>{oneClient.notes}</p>
              </div>
              <div className="flex flex-row justify-between items-center border-b-2 p-[1rem] border-gray-200">
                <p>Street Address</p>
                <p>{oneClient.address?.street}</p>
              </div>

              <div className="flex flex-row justify-between items-center border-b-2 p-[1rem] border-gray-200">
                <p>Postal Code</p>
                <p>{oneClient.address?.postalCode}</p>
              </div>

              <div className="flex flex-row justify-between items-center border-b-2 p-[1rem] border-gray-200">
                <p>City</p>
                <p>{oneClient.address?.city}</p>
              </div>

              <div className="flex flex-row justify-between items-center border-b-2 p-[1rem] border-gray-200">
                <p>Country</p>
                <p>{oneClient.address?.country}</p>
              </div>

              <div className="flex flex-col items-start p-[1rem] border-gray-200 bg-blue-50 rounded-[1rem] my-[1rem]">
                <p>Projects</p>
                <div>
                  {oneClient.projects?.map((project) => (
                    <p key={project._id}>{project.name}</p>
                  ))}
                </div>
              </div>
              <Button
                buttonColor="deleteButton"
                width="100%"
                textColor="white"
                onClick={() => deleteClient()}
              >
                Delete
              </Button>
            </div>
          )}

          <div
            className="flex flex-row justify-center gap-[1rem] sticky
          bottom-0 w-full p-[2rem] bg-blue-50"
          >
            <Button buttonColor="regularButton" width="100%" textColor="white">
              Edit
            </Button>
            <Button
              buttonColor="regularButton"
              onClick={() => {
                setSlideDetail('100%');
                reset();
              }}
              width="100%"
              textColor="white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
