import { useEffect, useState } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth0 } from '@auth0/auth0-react';
import TextArea from '@components/TextArea';
import axios from 'axios';
import InfoRow from '@components/InfoRow';
import Slide from '@components/Slide';
import Select from '@components/Select';
import InsightCard from '@components/InsightCard';
import ToggleButton from '@components/ToggleButton';
import TabSwitcher from '@components/TabSwitcher';

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
  const [select, setSelect] = useState('');

  const [pageWindowStart, setPageWindowStart] = useState(1);
  const PAGE_WINDOW_SIZE = 5;

  const [searchText, setSearchText] = useState('');

  const { getAccessTokenSilently } = useAuth0();

  const [activeTab, setActiveTab] = useState<string>('Unarchived');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, activeTab]);

  //--Get data from form--------------------------
  const fetchClients = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    // console.log(token);

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/clients?limit=1000`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  const deleteClient = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

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

  const CLIENTS_PER_PAGE = 10;

  const filteredClients = clients.data
    .filter((c) => {
      const name = c.name.toLowerCase();
      const search = searchText.toLowerCase();

      if (activeTab === 'Unarchived') {
        return !c.isArchived && name.includes(search);
      } else if (activeTab === 'Archived') {
        return c.isArchived && name.includes(search);
      } else if (activeTab === 'All Clients') {
        return name.includes(search);
      }
      return false;
    })
    .sort((a, b) => {
      switch (select) {
        case 'Names(Newest-Oldest)':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        case 'Invoices(Fewest->Most)':
          return a.invoiceCount - b.invoiceCount;
        case 'Total Projects(Fewest->Most)':
          return a.projectCount - b.projectCount;
        default:
          return 0;
      }
    });

  const pagedClients = filteredClients.slice(
    (currentPage - 1) * CLIENTS_PER_PAGE,
    currentPage * CLIENTS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredClients.length / CLIENTS_PER_PAGE);

  const options = [
    { key: 'projects', label: 'All Projects' },
    { key: 'clients', label: 'All Clients' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[1]);

  const handleToggle = (option: { key: string; label: string }) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col gap-[1rem] p-[1rem]">
      <div className="flex flex-row justify-between items-start ml:items-center">
        <div className="flex flex-row  flex-wrap justify-between items-center gap-[2rem]">
          <h2 className="text-2xl">
            {selectedOption.key === 'projects' && 'My Work'}
            {selectedOption.key === 'clients' && 'My Clients'}
          </h2>
          <ToggleButton options={options} option={selectedOption} onClick={handleToggle} />
        </div>
        <Button
          buttonColor="regularButton"
          // need to switch to project page------------------------------
          onClick={() => {
            setSlide('0px');
            resetFormData();
          }}
          textColor="white"
          width="200px"
        >
          {selectedOption.key === 'projects' && 'Add Project'}
          {selectedOption.key === 'clients' && 'Add Clients'}
        </Button>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[1rem]">
        <InsightCard
        title="Total"
        value={`$${(12000).toLocaleString()}`}
        />
        <InsightCard
        title="Active"
        value={`$${(8000).toLocaleString()}`}
        />
        <InsightCard
          title="Inactive"
          value={`${clients.data.filter((c) => !c.isArchived).length}`}
        />
        <InsightCard
        title="Archive"
        value={`${clients.data.filter((c) => c.isArchived).length}`}
        />
        <InsightCard
        title="Clients"
        value={`${clients.data.length}`}
        />
      </div>

      {/* client-list------------------------------------------------- */}
      {selectedOption.key === 'clients' && (
        <>
          <div className="flex flex-row flex-wrap items-center justify-start gap-[1rem]">
            <TabSwitcher
              tabs={['All Clients', 'Unarchived', 'Archived']}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <div className="w-[20rem]">
              <Input
                placeholder="Search client"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <Select
              width="150px"
              value={select}
              color="bg-white"
              onChange={setSelect}
              placeHolder="Sort By"
              options={[
                'Names(Newest-Oldest)',
                'Invoices(Fewest-Most)',
                'Total Projects(Fewest-Most)',
              ]}
            />
          </div>

          {filteredClients.length == 0 ? (
            <div className="flex flex-col flex-nowrap items-center gap-[1rem] p-[3rem] border-2 border-dashed border-blue-100 bg-blue-50 rounded-[20px]">
              <p className="text-gray-400 text-center">
                No clients added yet. Start by adding your first client to begin managing projects.
              </p>
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
          ) : (
            <div className="rounded-[20px] border overflow-hidden border-gray-200">
              <div className="overflow-x-auto w-full">
                <table className="text-center w-full min-[720px]">
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
                    {pagedClients.map((client, index) => (
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
              </div>
              <div className="bg-gray-200 w-full p-[1rem] flex felx-row flex-nowrap justify-between items-center">
                <p>Total {filteredClients.length}</p>
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
                    length: Math.min(PAGE_WINDOW_SIZE, totalPages - pageWindowStart + 1),
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
                      if (currentPage < totalPages) {
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
          )}
        </>
      )}
      {/* Add-Client----------------------------------- */}
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
        <InfoRow label="Notes" value={oneClient.notes} vertical={true} />
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

      {/* Projects------------- */}
      {selectedOption.key === 'projects' && <></>}
    </div>
  );
};

export default Clients;
