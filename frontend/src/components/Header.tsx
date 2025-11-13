import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserPicture from './UserPicture';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { ProjectApiResponse } from '@api/types/projectApi';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data } = useAppSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ProjectApiResponse[]>([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        },
      });

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects?limit=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      console.log(data.data);
      setSearchResults(data.data);
    };
    fetchProjects();
  }, [getAccessTokenSilently]);

  const filteredResults = searchResults.filter((p) => {
    const name = p.name?.toLowerCase();

    const matchesSearch = name.includes(searchValue);

    return matchesSearch;
  }).slice(0,5);

  return (
    <div className="flex m-0 p-[40px] justify-between items-center sticky top-0 bg-[#F5F9FF] mb-5 z-[1000]">
      <div
        className={`logo transition-all duration-3000 ${
          isSearchOpen ? 'hidden md:block' : 'block'
        }`}
        onClick={() => navigate('/')}
      >
        <img src="/clario.svg" alt="Clario logo" />
      </div>
      <div className="flex items-center justify-between gap-[20px]">
        {/* <div className="flex flex-col items-center"> */}
        <SearchBar
          isSearchOpen={isSearchOpen}
          onSearchOpen={setIsSearchOpen}
          searchValue={searchValue}
          onChange={setSearchValue}
        >
          <div
            className={`absolute bg-[var(--primitive-colors-brand-primary-025)] border border-[var(--primitive-colors-gray-light-mode-200)] shadow-md backdrop-blur-sm p-[1rem] rounded-xl top-[.5rem] w-full ${searchValue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300`}
          >
            {filteredResults.length != 0 && searchValue ? (
              <>
                {filteredResults.map((project, index) => (
                  <Link
                    onClick={() => {setSearchValue('');setIsSearchOpen(false)}}
                    to={`/projects/${project.id}`}
                    key={index}
                    className="flex flex-row justify-between mb-1 pb-0.5 cursor-pointer border-b-0 transition-all relative group"
                  >
                    {project.name}
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--primitive-colors-brand-primary-400)] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full
    "
                    />
                  </Link>
                ))}
              </>
            ) : (
              <>{searchValue ? 'Not found' : ''}</>
            )}
          </div>
        </SearchBar>
        {/* </div> */}
        <div
          className={`transition-all duration-3000 ${isSearchOpen ? 'hidden md:block' : 'block'}`}
        >
          <UserPicture imgURL={data?.picture} />
        </div>
      </div>
    </div>
  );
};

export default Header;
