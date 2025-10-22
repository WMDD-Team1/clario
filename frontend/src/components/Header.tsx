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
        <div className='flex m-0 p-[40px] justify-between items-center sticky top-0 bg-white mb-5'>
            <div className={`logo transition-all duration-3000 ${isSearchOpen ? "hidden md:block" : "block"
                }`} onClick={() => navigate("/")}>
                <img src="/clario.svg" alt="Clario logo" />
            </div>
            <div className='flex items-center justify-between gap-[20px]'>
                <SearchBar isSearchOpen={isSearchOpen} onSearchOpen={setIsSearchOpen} />
                <div className={`transition-all duration-3000 ${isSearchOpen ? "hidden md:block" : "block"
                    }`}>
                    <UserPicture imgURL={data?.picture} />
                </div>
            </div>
        </div>
    )
}

export default Header