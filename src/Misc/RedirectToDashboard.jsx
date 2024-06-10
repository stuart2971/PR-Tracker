import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function RedirectToDashboard() {
    const { user, isAuthenticated } = useAuth0();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigateTo(`/dashboard/${user?.sub}`);
    }, [isAuthenticated]);
    return <></>;
}
export default RedirectToDashboard;
