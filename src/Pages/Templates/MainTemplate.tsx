import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login";
import Logout from "../Authentication/Logout";
import { useAuth0 } from "@auth0/auth0-react";

function MainTemplate({ children }) {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const userId = user?.sub || "";

    function checkIfAuthenticated() {
        if (!isAuthenticated) loginWithRedirect();
    }
    return (
        <div className="flex h-screen">
            {/* Navbar */}
            <div className="w-full flex justify-center fixed mt-4">
                <div
                    id="navbar"
                    className="bg-purple-700 p-4 rounded-lg text-white mt-4"
                >
                    <span className="mx-2">
                        <Link
                            onClick={checkIfAuthenticated}
                            to={`/dashboard/${userId}`}
                        >
                            Dashboard
                        </Link>
                    </span>

                    <span className="mx-2">
                        <Link to="/addset">Add Set</Link>
                    </span>
                </div>
            </div>
            {/* Body Container */}
            <div className="flex flex-row w-full h-full">
                {/* Main Body */}
                <div className="bg-gray-500 w-4/5 pt-24">{children}</div>
                {/* Friends List */}
                <div className="bg-white w-1/5 pt-12 px-8">
                    <div className="flex content-center">
                        <h2 className="font-semibold text-xl">Friends</h2>
                        <h2 className="text-xl text-gray-400 ml-2">
                            #{userId.substring(userId.length - 6)}
                        </h2>
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="outline-none mt-4 border border-1 border-gray-300 rounded-full py-1 px-2"
                    />
                </div>
                {isAuthenticated ? <Logout /> : <Login />}
            </div>
        </div>
    );
}

export default MainTemplate;
