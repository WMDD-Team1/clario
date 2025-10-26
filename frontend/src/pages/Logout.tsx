import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutSliceAction } from "@/store/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@components/Button";

export const Logout = () => {
    const { logout } = useAuth0();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutSliceAction());
        logout({ logoutParams: { returnTo: window.location.origin } })
    }
    return (
        <>
        {handleLogout()}
        </>
    )
}

export default Logout