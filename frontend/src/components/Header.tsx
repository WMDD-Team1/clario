import { useAppSelector } from '@/store/hooks';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserPicture from './UserPicture';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { ProjectApiResponse } from '@api/types/projectApi';
import { ClientApiResponse } from '@api/types/clientApi';

import {
  LogOutIcon,
  FaqInactiveIcon,
  SettingsInactiveIcon,
} from '@/assets/icons';

type SearchResultType = 'project' | 'client';

interface SearchResult {
  id: string;
  name: string;
  type: SearchResultType;
}
const Header = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data } = useAppSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { getAccessTokenSilently } = useAuth0();

  /** ---------------- FETCH PROJECTS + CLIENTS ---------------- **/
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const [projectsResponse, clientsResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects?limit=1000`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/clients?limit=1000`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const projects: SearchResult[] = projectsResponse.data.data.map(
        (p: ProjectApiResponse) => ({
          id: p.id,
          name: p.name,
          type: 'project',
        })
      );

      const clients: SearchResult[] = clientsResponse.data.data.map(
        (c: ClientApiResponse) => ({
          id: c.id,
          name: c.name,
          type: 'client',
        })
      );

      setSearchResults([...projects, ...clients]);
    };

    fetchData();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchValue('');
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen || searchValue) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, searchValue]);

  const filteredResults = searchResults
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="flex m-0 p-[40px] justify-between items-center sticky top-0 bg-[var(--background)] mb-5 z-[1000]">
      <div
        className={`logo transition-all duration-3000 ${
          isSearchOpen ? 'hidden md:block' : 'block'
        }`}
        onClick={() => navigate('/')}
      >
        <img src="/clario.svg" alt="Clario logo" />
      </div>
      <div ref={searchContainerRef}>
        <div className="flex items-center justify-between gap-[20px]">

          {/* SEARCH BAR */}
          <SearchBar
            isSearchOpen={isSearchOpen}
            onSearchOpen={setIsSearchOpen}
            searchValue={searchValue}
            onChange={setSearchValue}
          >
            {filteredResults.length != 0 && searchValue ? (
              <>
                {filteredResults.map((project, index) => (
                  <Link
                    onClick={() => {
                      setSearchValue('');
                      setIsSearchOpen(false);
                    }}
                    to={
                      project.type === 'project'
                        ? `/projects/${project.id}`
                        : `/projects?clientId=${project.id}`
                    }
                    key={index}
                    className="flex flex-row justify-between items-center mb-1 pb-0.5 cursor-pointer border-b-0 transition-all relative group"
                  >
                    {project.name}
                    <p className='text-[.8rem]'>{project.type}</p>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--primitive-colors-brand-primary-400)] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full"
                    />
                  </Link>
                ))}
              </>
            ) : (
              <>{searchValue ? 'Not found' : ''}</>
            )}
          </div>
        </SearchBar>
        <div
          className={`transition-all duration-3000 ${isSearchOpen ? 'hidden md:block' : 'block'}`}
        >
          <UserPicture imgURL={data?.picture} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Header;
