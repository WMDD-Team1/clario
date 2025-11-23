import { useAppSelector } from '@/store/hooks';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserPicture from './UserPicture';
import ToggleSwitch from './ToggleSwitch';
import { ProjectApiResponse } from '@api/types/projectApi';
import { ClientApiResponse } from '@api/types/clientApi';
import { useQuery } from '@tanstack/react-query';
import { fetchAllClients, fetchAllProjects } from '@/api';
import { updateUserPreferences } from '@api/services/settingService';
import { updateUser } from '@store/userSlice';
import { useDispatch } from 'react-redux';

type SearchResultType = 'project' | 'client';

interface SearchResult {
  id: string;
  name: string;
  type: SearchResultType;
}

const Header = () => {
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.user);

  // --- State ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ---- Dark Mode Logic
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSavingTheme, setIsSavingTheme] = useState(false);
  const [themeError, setThemeError] = useState<string | null>(null);

  // --- Refs ---
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- Data Fetching ---
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

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark' | null) ||
      data?.settings?.general?.theme ||
      'light';

    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [data]);

  // Save to DOM + localStorage on toggle
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // --- Event Listeners ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Search Logic
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchValue('');
        setIsSearchOpen(false);
      }
      // Dropdown Logic (Only affects Mobile now as Desktop has no dropdown)
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isSearchOpen || searchValue || isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, searchValue, isDropdownOpen]);

  // Click handler for toggle switch
  const handleThemeToggle = async () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    setThemeError(null);
    setIsSavingTheme(true);

    try {
      const res = await updateUserPreferences({ theme: newMode });
      dispatch(updateUser(res.data));
      localStorage.setItem('theme', newMode);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update mode.';
      setThemeError(message);
      console.error(err);
    } finally {
      setIsSavingTheme(false);
    }
  };

  const filteredResults = searchResults
    .filter((item) => {
      const name = item.name?.toLowerCase();
      return name.includes(searchValue.toLowerCase());
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const searchResultsContent = (
    <div
      className={`absolute bg-[var(--background-toggle2)] text-[var(--secondary-text)] border border-[var(--sublight)] shadow-md backdrop-blur-sm p-[1rem] rounded-xl top-[.5rem] w-full ${
        searchValue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } transition-all duration-300 max-h-[200px] overflow-y-scroll`}
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
              <p className="text-[.8rem]">{project.type}</p>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--primitive-colors-brand-primary-400)] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full" />
            </Link>
          ))}
        </>
      ) : (
        <>{searchValue ? 'Not found' : ''}</>
      )}
    </div>
  );

  const dropdownMenu = (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-[10px] shadow-lg z-50 border border-gray-200">
      <Link
        to="/settings"
        onClick={() => setIsDropdownOpen(false)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 transition-colors"
      >
        Profile
      </Link>
      <Link
        to="/faq"
        onClick={() => setIsDropdownOpen(false)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 rounded-t-[10px] hover:bg-gray-100 transition-colors"
      >
        Support & FAQ
      </Link>
      <Link
        to="/logout"
        onClick={() => setIsDropdownOpen(false)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 rounded-b-[10px] hover:bg-gray-100 transition-colors"
      >
        Logout
      </Link>
    </div>
  );

  return (
    <>
      {/* DESKTOP HEADER */}
      <div className="hidden md:flex m-0 p-[40px] justify-between items-center sticky top-0 bg-[color-mix(in_srgb,var(--full-bg),transparent_10%)] backdrop-blur-sm mb-5 z-[1000]">
        <div
          className={`logo transition-all duration-3000 ${
            isSearchOpen ? 'hidden md:block' : 'block'
          }`}
          onClick={() => navigate('/')}
        >
          <img src="/clario.svg" alt="Clario logo" className="w-[160px]"/>
        </div>

        <div className="flex items-center justify-between gap-[20px]">
          {/* Toggle Switch */}
          <div className="hidden md:block">
            <ToggleSwitch
              checked={isDarkMode}
              onChange={handleThemeToggle}
            />
          </div>

          <div ref={searchContainerRef}>
            <SearchBar
              isSearchOpen={isSearchOpen}
              onSearchOpen={setIsSearchOpen}
              searchValue={searchValue}
              onChange={setSearchValue}
            >
              {searchResultsContent}
            </SearchBar>
          </div>

          {/* Desktop User Picture */}
          <div
            className={`relative transition-all duration-3000 ${
              isSearchOpen ? 'hidden md:block' : 'block'
            }`}
          >
            <UserPicture imgURL={data?.picture} />
          </div>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="flex md:hidden m-0 p-[20px] justify-between items-center sticky top-0 rounded-b-[40px] bg-[var(--general-alpha)] mb-5 z-[1000]">
        <div
          className="logo cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="/clario.svg" alt="Clario logo" className="w-[115.73px] h-[37px]" />
        </div>

        <div className="flex items-center gap-[15px]">
          {/* Mobile Search */}
          <div ref={searchContainerRef}>
            <SearchBar
              isSearchOpen={isSearchOpen}
              onSearchOpen={setIsSearchOpen}
              searchValue={searchValue}
              onChange={setSearchValue}
            >
              {searchResultsContent}
            </SearchBar>
          </div>

          {/* Mobile User Menu (HAS DROPDOWN) */}
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer"
            >
              <UserPicture imgURL={data?.picture} variant="mobile" />
            </div>
            {isDropdownOpen && dropdownMenu}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;