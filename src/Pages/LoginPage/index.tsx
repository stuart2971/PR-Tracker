import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({}) {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigateTo(`/dashboard/${user?.sub}`);
    }, [isAuthenticated]);

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h2 className="text-lg font-bold">PR Tracker for Powerlifting</h2>
            <a onClick={() => loginWithRedirect()}>
                You need an account. Click here to signup or log in.
            </a>
        </div>
    );
}
export default LoginPage;
