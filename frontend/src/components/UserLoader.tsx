import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

export function UserLoader({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuth0();
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated && user?.sub && !data && !loading) {
            dispatch(login());
        }
    }, [isAuthenticated, user, data, loading, dispatch]);

    useEffect(() => {
        if (error) {
            console.log(`Error in loader: ${error}`)
        }
    }, [error])

    return <>{children}</>
}