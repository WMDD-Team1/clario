import { useEffect, useState } from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import { useAuth0 } from '@auth0/auth0-react';
import TextArea from '@components/TextArea';
import axios from 'axios';
import InfoRow from '@components/InfoRow';
import Slide from '@components/Slide';
import FiltersBar from '@components/FiltersBar';
import Table from '@components/Table';
import { DotsButton } from '@assets/icons';
import EmptyState from './EmptyState';

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

  interface Option {
    id: string;
    label: string;
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
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<string>('Active');

  const { getAccessTokenSilently } = useAuth0();

  const sortOptions: Option[] = [
    { id: 'newest', label: 'Names (Newest-Oldest)' },
    { id: 'invoices', label: 'Invoices (Fewest→Most)' },
    { id: 'projects', label: 'Total Projects (Fewest→Most)' },
  ];

  const [selectedSort, setSelectedSort] = useState<Option>(sortOptions[0]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, activeTab, selectedSort]);

  const fetchClients = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

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
      // setSlideDetail('0px');
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

  const unarchiveClient = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      },
    });

    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/clients/${clientId}`,
      {
        isArchived: false,
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
  }, []);

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
      const name = c.name?.toLowerCase() || '';
      const search = searchText.toLowerCase().trim();

      const matchesSearch = search === '' || name.includes(search);

      if (activeTab === 'Active') {
        return !c.isArchived && matchesSearch;
      } else if (activeTab === 'Archived') {
        return c.isArchived && matchesSearch;
      } else if (activeTab === 'All Clients') {
        return matchesSearch;
      }
      return false;
    })
    .sort((a, b) => {
      switch (selectedSort.id) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'invoices':
          return a.invoiceCount - b.invoiceCount;
        case 'projects':
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

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredClients.length]);

  const options = [
    { key: 'projects', label: 'All Projects' },
    { key: 'clients', label: 'All Clients' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[1]);

  // Table configuration
  const tableHeaders = [
    { key: 'name', value: 'Client Name' },
    { key: 'phone', value: 'Phone' },
    { key: 'email', value: 'Email' },
    { key: 'country', value: 'Country' },
    { key: 'invoiceCount', value: 'Invoices' },
    { key: 'projectCount', value: 'Total Projects' },
    { key: 'actions', value: '' },
  ];

  const [openDotsId, setOpenDotsId] = useState<string | null>(null);

  const tableData = pagedClients.map((client) => ({
    name: client.name,
    phone: client.phone,
    email: client.email,
    country: client.address.country,
    invoiceCount: client.invoiceCount,
    projectCount: client.projectCount,
    actions: (
      <div className="relative hidden md:block">
        <DotsButton
          className="h-[1rem] cursor-pointer"
          onClick={() => {
            setOpenDotsId(openDotsId === client.id ? null : client.id);
            handleClientDetail(client.id);
          }}
        />

        {openDotsId === client.id && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpenDotsId(null)}></div>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-20 p-[1rem] rounded-[1rem] hidden md:block cursor-pointer">
              <div
                className="cursor-pointer px-4 py-2 hover:bg-blue-100 rounded-[.5rem]"
                onClick={() => {
                  // handleClientDetail(client.id);
                  setSlideDetail('0px');
                  setOpenDotsId(null);
                }}
              >
                View
              </div>
              <div
                className="cursor-pointer px-4 py-2 hover:bg-blue-100 rounded-[.5rem]"
                onClick={() => {
                  // handleClientDetail(client.id);
                  setSlideEdit('0px');
                  setOpenDotsId(null);
                }}
              >
                Edit
              </div>
              <div
                className="cursor-pointer px-4 py-2 hover:bg-red-100 rounded-[.5rem]"
                onClick={() => {
                  // handleClientDetail(client.id);
                  {
                    !client.isArchived ? deleteClient() : unarchiveClient();
                  }
                  setOpenDotsId(null);
                }}
              >
                {!client.isArchived ? 'Archive' : 'Unarchive'}
              </div>
            </div>
          </>
        )}
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-[1rem]">
      {selectedOption.key === 'clients' && (
        <>
          <FiltersBar
            currentFilter={activeTab}
            filters={['All Clients', 'Active', 'Archived']}
            onFilter={(filter) => {
              setActiveTab(filter);
              setSearchText('');
            }}
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            searchValue={searchText}
            onSearchChange={setSearchText}
            searchPlaceholder="Search by client name"
          />

          {filteredClients.length === 0 ? (
            <EmptyState
              description="No clients added yet. Start by adding your first client to begin managing projects."
              buttonText="Add Client"
              onAction={() => {
                setSlide('0px');
                resetFormData();
              }}
            />
          ) : (
            <Table
              headers={tableHeaders}
              data={tableData}
              total={filteredClients.length}
              page={currentPage}
              pageSize={CLIENTS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

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

        <Button
          buttonColor={!oneClient.isArchived ? 'deleteButton' : 'regularButton'}
          width="100%"
          textColor="white"
          onClick={() => {
            !oneClient.isArchived ? deleteClient() : unarchiveClient();
          }}
        >
          {!oneClient.isArchived ? 'Archive' : 'Unarchive'}
        </Button>
      </Slide>

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
