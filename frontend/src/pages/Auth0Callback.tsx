import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth0Callback = () => {
    const { user, isAuthenticated } = useAuth0();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data: appUser, loading, error } = useAppSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (isAuthenticated && user?.sub) {
            dispatch(login(user.sub));
        }
    }, [isAuthenticated, user, dispatch])

    useEffect(() => {
        if (!loading) {
            if (appUser) {
                navigate("/dashboard");
            } else if (error?.includes("404")) {
                navigate("/signup");
            } else if (error) {
                console.error("Unexpected error: ", error);
            }
        }
    }, [loading, appUser, error, navigate]);

    console.log(appUser)

    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-lg">Finishing login...</p>
        </div>
    );
}