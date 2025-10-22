import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth0 } from '@auth0/auth0-react';
import TextArea from '@components/TextArea';
import axios from 'axios';
import InfoRow from '@components/InfoRow';
import Slide from '@components/Slide';
import Select from '@components/Select';

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
  const [slideEdit, setSlideEdit] = useState('100%');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [clientId, setClientId] = useState('');
  const [selected, setSelected] = useState('');

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

  const handleClientDetail = async (id: string) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOneClient(response.data);
      setClientId(id);
      setSlideDetail('0px');
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchOneClient = async () => {
  //   const token = await getAccessTokenSilently({
  //     authorizationParams: {
  //       audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
  //     },
  //   });

  //   // console.log(token);

  //   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/clients/${clientId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await response.data;
  //   console.log(data);
  //   setOneClient(data);
  // };

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

  const updateClient = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    const payload = {
      name: oneClient.name,
      email: oneClient.email,
      type: 'Individual',
      phone: oneClient.phone,
      address: { ...oneClient.address },
      notes: oneClient.notes,
    };

    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/clients/${clientId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.data;
    console.log(data);
    await fetchClients();
    setSlideEdit('100%');
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage]);

  // useEffect(() => {
  //   fetchOneClient();
  // }, [clientId]);

  interface FormData {
    name: string | null;
    email: string | null;
    type: 'Individual' | 'Company';
    phone: string | null;
    address: Address;
    notes: string | null;
  }

  function resetFormData() {
    setOneClient({
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
  }

  const onSubmit = async () => {
    const payload = {
      name: oneClient.name,
      email: oneClient.email,
      type: 'Individual',
      phone: oneClient.phone,
      address: { ...oneClient.address },
      notes: oneClient.notes,
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

      resetFormData();

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
          onClick={() => {
            setSlide('0px');
            resetFormData();
          }}
          textColor="white"
          width="200px"
        >
          Add Client
        </Button>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[1rem]">
        <Button
          buttonColor="lightButton"
          width="calc(20% - 0.8rem)"
          textColor="black"
          onClick={() => console.log('Total clicked')}
        >
          <div className="flex flex-col items-center justify-center gap-[.5rem]">
            <p>Total</p>
            <p>$12000</p>
          </div>
        </Button>

        <Button
          buttonColor="lightButton"
          width="calc(20% - 0.8rem)"
          textColor="black"
          onClick={() => {}}
        >
          <div className="flex flex-col items-center justify-center gap-[.5rem]">
            <p>Active</p>
            <p>$8000</p>
          </div>
        </Button>

        <Button
          buttonColor="lightButton"
          width="calc(20% - 0.8rem)"
          textColor="black"
          onClick={() => {}}
        >
          <div className="flex flex-col items-center justify-center gap-[.5rem]">
            <p>Inactive</p>
            <p>10</p>
          </div>
        </Button>

        <Button
          buttonColor="lightButton"
          width="calc(20% - 0.8rem)"
          textColor="black"
          onClick={() => {}}
        >
          <div className="flex flex-col items-center justify-center gap-[.5rem]">
            <p>Archive</p>
            <p>5</p>
          </div>
        </Button>

        <Button
          buttonColor="lightButton"
          width="calc(20% - 0.8rem)"
          textColor="black"
          onClick={() => {}}
        >
          <div className="flex flex-col items-center justify-center gap-[.5rem]">
            <p>Clients</p>
            <p>30</p>
          </div>
        </Button>
      </div>

      {/* client-list------------------------------------------------- */}
      <div className="flex flex-row flex-nowrap items-center justify-start gap-[1rem]">
        <div className="w-[20rem]">
          <Input placeholder="Search client" />
        </div>
        <Select
          value={selected}
          color="bg-white"
          onChange={setSelected}
          placeHolder="Sort By"
          options={[
            'Names(Newest->Oldest)',
            'Invoices(Fewest->Most)',
            'Total Projects(Fewest->Most',
          ]}
        />
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
                    onClick={() => handleClientDetail(client.id)}
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

      <Slide
        title="Add Client"
        confirmText="Add"
        slide={slide}
        onClose={() => setSlide('100%')}
        onConfirm={onSubmit}
      >
        <div className="flex flex-col gap-[1.5rem]">
          <Input
            color="bg-white"
            label="Client Name"
            value={oneClient.name}
            onChange={(e) => setOneClient({ ...oneClient, name: e.target.value })}
          />
          <Input
            color="bg-white"
            label="Phone"
            value={oneClient.phone}
            onChange={(e) => setOneClient({ ...oneClient, phone: e.target.value })}
          />
          <Input
            color="bg-white"
            label="Email"
            type="email"
            value={oneClient.email}
            onChange={(e) => setOneClient({ ...oneClient, email: e.target.value })}
          />
          <TextArea
            label="Notes"
            color="bg-white"
            value={oneClient.notes}
            onChange={(e) => setOneClient({ ...oneClient, notes: e.target.value })}
          />

          <p>Client's Address</p>
          <Input
            color="bg-white"
            label="Street Address"
            value={oneClient.address?.street}
            onChange={(e) =>
              setOneClient({
                ...oneClient,
                address: { ...oneClient.address, street: e.target.value },
              })
            }
          />
          <Input
            color="bg-white"
            label="Postal Code"
            value={oneClient.address?.postalCode}
            onChange={(e) =>
              setOneClient({
                ...oneClient,
                address: { ...oneClient.address, postalCode: e.target.value },
              })
            }
          />
          <Input
            color="bg-white"
            label="City"
            value={oneClient.address?.city}
            onChange={(e) =>
              setOneClient({
                ...oneClient,
                address: { ...oneClient.address, city: e.target.value },
              })
            }
          />
          <Input
            color="bg-white"
            label="Country"
            value={oneClient.address?.country}
            onChange={(e) =>
              setOneClient({
                ...oneClient,
                address: { ...oneClient.address, country: e.target.value },
              })
            }
          />
        </div>
      </Slide>

      {/* Client-details----------------------------------- */}
      <Slide
        title="Client Details"
        slide={slideDetail}
        onClose={() => setSlideDetail('100%')}
        confirmText="Edit"
        onConfirm={() => setSlideEdit('0px')}
      >
        <InfoRow label="Client Name" value={oneClient.name} />
        <InfoRow label="Phone" value={oneClient.phone} />
        <InfoRow label="Email" value={oneClient.email} />
        <InfoRow label="Notes" value={oneClient.notes} />
        <InfoRow label="Street Address" value={oneClient.address?.street} />
        <InfoRow label="Postal Code" value={oneClient.address?.postalCode} />
        <InfoRow label="City" value={oneClient.address?.city} />
        <InfoRow label="Country" value={oneClient.address?.country} />

        <div className="flex flex-col items-start p-[1rem] border-gray-200 bg-blue-50 rounded-[1rem] my-[1rem]">
          <p>Projects</p>
          {oneClient.projects?.map((project) => (
            <p key={project._id}>{project.name}</p>
          ))}
        </div>

        <Button buttonColor="deleteButton" width="100%" textColor="white" onClick={deleteClient}>
          Delete
        </Button>
      </Slide>

      {/*----Edit page-------------------------------------- */}
      <Slide
        title="Edit Client"
        confirmText="Save"
        slide={slideEdit}
        onClose={() => setSlideEdit('100%')}
        onConfirm={updateClient}
      >
        <Input
          color="bg-white"
          label="Client Name"
          value={oneClient.name}
          onChange={(e) => setOneClient({ ...oneClient, name: e.target.value })}
        />
        <Input
          color="bg-white"
          label="Phone"
          value={oneClient.phone}
          onChange={(e) => setOneClient({ ...oneClient, phone: e.target.value })}
        />
        <Input
          color="bg-white"
          label="Email"
          type="email"
          value={oneClient.email}
          onChange={(e) => setOneClient({ ...oneClient, email: e.target.value })}
        />
        <TextArea
          label="Notes"
          color="bg-white"
          value={oneClient.notes}
          onChange={(e) => setOneClient({ ...oneClient, notes: e.target.value })}
        />

        <p>Client's Address</p>
        <Input
          color="bg-white"
          label="Street Address"
          value={oneClient.address?.street}
          onChange={(e) =>
            setOneClient({
              ...oneClient,
              address: { ...oneClient.address, street: e.target.value },
            })
          }
        />
        <Input
          color="bg-white"
          label="Postal Code"
          value={oneClient.address?.postalCode}
          onChange={(e) =>
            setOneClient({
              ...oneClient,
              address: { ...oneClient.address, postalCode: e.target.value },
            })
          }
        />
        <Input
          color="bg-white"
          label="City"
          value={oneClient.address?.city}
          onChange={(e) =>
            setOneClient({
              ...oneClient,
              address: { ...oneClient.address, city: e.target.value },
            })
          }
        />
        <Input
          color="bg-white"
          label="Country"
          value={oneClient.address?.country}
          onChange={(e) =>
            setOneClient({
              ...oneClient,
              address: { ...oneClient.address, country: e.target.value },
            })
          }
        />
      </Slide>
    </div>
  );
};

export default Clients;
