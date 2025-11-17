import { useAppSelector } from '@/store/hooks';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserPicture from './UserPicture';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { ProjectApiResponse } from '@api/types/projectApi';
import { ClientApiResponse } from '@api/types/clientApi';

import { useQuery } from '@tanstack/react-query';
import { fetchAllClients, fetchAllProjects } from '@/api';

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
  // const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { data: projectsData } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchAllProjects(),
  });

  const { data: clientsData } = useQuery({
    queryKey: ['clients'],
    queryFn: () => fetchAllClients(),
  });

  const searchResults: SearchResult[] = [
    ...(projectsData?.data || []).map((p: ProjectApiResponse) => ({
      id: p.id,
      name: p.name,
      type: 'project' as SearchResultType,
    })),
    ...(clientsData?.data || []).map((c: ClientApiResponse) => ({
      id: c.id,
      name: c.name,
      type: 'client' as SearchResultType,
    })),
  ];

  /** ---------------- CLOSE ON OUTSIDE CLICK ---------------- **/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchValue('');
        setIsSearchOpen(false);
        setMobileMenuOpen(false); // CLOSE MOBILE DROPDOWN
      }
    };

    if (isSearchOpen || searchValue || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, searchValue, mobileMenuOpen]);

  /** ---------------- FILTER SEARCH ---------------- **/
  const filteredResults = searchResults
    .filter((item) => {
      const name = item.name?.toLowerCase();
      return name.includes(searchValue.toLowerCase());
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className="flex m-0 py-[10px] px-[20px] md:p-[40px] justify-between items-center sticky top-0 bg-[var(--background)] mb-5 z-[1000]
    md:bg-[var(--background)] rounded-b-[20px] shadow-md md:rounded-none md:shadow-none"
    >
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
          {/* <div className="flex flex-col items-center"> */}
          <SearchBar
            isSearchOpen={isSearchOpen}
            onSearchOpen={setIsSearchOpen}
            searchValue={searchValue}
            onChange={setSearchValue}
          >
            <div
              className={`absolute bg-[var(--primitive-colors-brand-primary-025)] border border-[var(--primitive-colors-gray-light-mode-200)] shadow-md backdrop-blur-sm p-[1rem] rounded-xl top-[.5rem] w-full ${searchValue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300 max-h-[200px] overflow-y-scroll`}
            >
              <div
                className={`absolute bg-[var(--primitive-colors-brand-primary-025)] border border-[var(--primitive-colors-gray-light-mode-200)] shadow-md backdrop-blur-sm p-[1rem] rounded-xl top-[.5rem] w-full ${
                  searchValue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                } transition-all duration-300`}
              >
                {filteredResults.length !== 0 && searchValue ? (
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
                        <p className="text-[.8rem]">{project.type}</p>
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--primitive-colors-brand-primary-400)] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full" />
                      </Link>
                    ))}
                  </>
                ) : (
                  <>{searchValue ? 'Not found' : ''}</>
                )}
              </div>
            </div>
          </SearchBar>

          {/* ---------------- USER ICON SECTION ---------------- */}
          <div className="relative">
            {/* DESKTOP USER IMAGE */}
            <div
              className={`hidden md:block transition-all duration-3000 ${
                isSearchOpen ? 'hidden md:block' : 'block'
              }`}
            >
              <UserPicture imgURL={data?.picture} />
            </div>

            {/* MOBILE USER ICON BUTTON */}
            <button
              className="md:hidden w-15 h-15 rounded-full overflow-hidden border border-gray-300 shadow-md"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <img
                src={data?.picture || '/default-user.png'}
                alt="User"
                className="w-full h-full object-cover"
              />
            </button>

            {/* MOBILE DROPDOWN MENU */}
            {mobileMenuOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-[var(--general-alpha)] shadow-lg rounded-xl p-2 z-[2000] md:hidden">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-150
                  hover:[var(--primitive-colors-gray-light-mode-100)] active:[var(--primitive-colors-gray-light-mode-200)] active:scale-[0.98]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/faq"
                  className="flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-150
                  hover:[var(--primitive-colors-gray-light-mode-100)] active:[var(--primitive-colors-gray-light-mode-200)] active:scale-[0.98]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>

                <Link
                  to="/logout"
                  className="flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-150
                  hover:[var(--primitive-colors-gray-light-mode-100)] active:[var(--primitive-colors-gray-light-mode-200)] active:scale-[0.98]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
