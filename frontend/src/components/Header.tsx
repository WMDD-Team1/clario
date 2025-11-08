import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserPicture from './UserPicture';

const Header = () => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { data } = useAppSelector((state) => state.user);

    return (
        <div className='flex m-0 px-4 py-4 justify-between items-center sticky top-0 md:bg-[#F5F9FF] bg-white mb-5 z-[1000] rounded-b-[20px] shadow-md md:rounded-none md:shadow-none'>
            <div className={`logo transition-all duration-3000 ${isSearchOpen ? "hidden md:block" : "block"
                }`} onClick={() => navigate("/")}>
                <img src="/clario.svg" className="w-[120px] md:w-auto" alt="Clario logo" />
            </div>
            <div className='flex items-center justify-between gap-[20px]'>
                <SearchBar isSearchOpen={isSearchOpen} onSearchOpen={setIsSearchOpen} onChange={() => console.log()} />
                <div className={`transition-all duration-3000 ${isSearchOpen ? "hidden md:block" : "block"
                    }`}>
                    <UserPicture imgURL={data?.picture} />
                </div>
            </div>
        </div>
    )
}

export default Header