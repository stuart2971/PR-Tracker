import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login";
import Logout from "../Authentication/Logout";
import { useAuth0 } from "@auth0/auth0-react";

function MainTemplate({ children }) {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { logout } = useAuth0();

    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const userId = user?.sub || "";

    function checkIfAuthenticated() {
        if (!isAuthenticated) loginWithRedirect();
    }
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className="flex md:flex-row flex-col h-screen">
                <div className="bg-white w-full md:w-1/6 h-full p-4 md:pt-24 flex flex-col border-r-black md:border text-center md:text-left justify-between">
                    <div>
                        <h1 className="text-xl md:mb-8">
                            Powerlifting Progression Tracker
                        </h1>

                        {!isMobile && (
                            <div className="flex flex-col">
                                <Link
                                    to={`/dashboard/${user?.sub}`}
                                    className="mb-4 hover:bg-gray-100 py-2 pl-4 rounded"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/addset"
                                    className="mb-4 hover:bg-gray-100 py-2 pl-4 rounded"
                                >
                                    Add Set
                                </Link>
                            </div>
                        )}
                    </div>
                    {isMobile && (
                        <Link
                            to={"/"}
                            className="hover:bg-gray-100 py-2 pl-4 rounded"
                            onClick={() =>
                                logout({
                                    returnTo: window.location.origin,
                                })
                            }
                        >
                            Add Set
                        </Link>
                    )}
                    <Link
                        to={"/"}
                        className="mb-4 hover:bg-gray-100 md:py-2 pl-4 rounded"
                        onClick={() =>
                            logout({
                                returnTo: window.location.origin,
                            })
                        }
                    >
                        Sign out
                    </Link>
                </div>
                {/* Body Container */}
                <div className="flex flex-row w-full h-full">
                    {/* Main Body */}
                    <div className="flex w-full pt-4 md:pt-24 h-full px-2 md:px-16">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainTemplate;
