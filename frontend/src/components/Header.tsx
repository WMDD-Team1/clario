import { useAppSelector } from '@/store/hooks';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserPicture from './UserPicture';

const Header = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { data } = useAppSelector((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div className='flex m-0 px-4 py-4 justify-between items-center sticky top-0 md:bg-[var(--general-alpha)] bg-[var(--general-alpha)] mb-5 z-[1000] rounded-b-[40px] shadow-md md:rounded-none md:shadow-none'>
      {/* Logo */}
      <div
        className={`logo transition-all duration-300 ${isSearchOpen ? 'hidden md:block' : 'block'}`}
        onClick={() => navigate('/')}
      >
        <img src="/clario.svg" className="w-[120px] md:w-auto" alt="Clario logo" />
      </div>

      {/* Right Section */}
      <div className='flex items-center justify-between gap-[20px] relative'>
        <SearchBar
          isSearchOpen={isSearchOpen}
          onSearchOpen={setIsSearchOpen}
          onChange={() => console.log()}
        />

        {/* User Picture (menu toggle) */}
        <div
          className={`transition-all duration-300 ${isSearchOpen ? 'hidden md:block' : 'block'} cursor-pointer`}
          ref={menuRef}
        >
          <div onClick={() => setIsMenuOpen((prev) => !prev)}>
            <UserPicture imgURL={data?.picture} />
          </div>

          {/* Dropdown Menu (mobile only) */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg md:hidden animate-ease-in-out-0.7s overflow-hidden">
              <ul className="flex flex-col text-sm text-gray-700">
                {/* Profile */}
                <li
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/settings');
                  }}
                >
                  <span>Profile</span>
                </li>

                {/* FAQ */}
                <li
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/dashboard3');
                  }}
                >
                  <span>Support & FAQ</span>
                </li>

                {/* Logout */}
                <li
                  className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 cursor-pointer border-t border-gray-100"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
