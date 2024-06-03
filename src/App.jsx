import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getLogs } from "./Requests";

import Dashboard from "./Pages/Dashboard";
import AddSet from "./Pages/AddSet";

function App() {
    const { user, isAuthenticated } = useAuth0();
    const [logs, setLogs] = useState([]);

    async function fetchLogs(userId) {
        const data = await getLogs(userId);
        setLogs(data);
    }
    useEffect(() => {
        if (isAuthenticated) fetchLogs(user?.sub);
    }, [isAuthenticated]);

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/dashboard/:userId"
                        element={<Dashboard logs={logs} key={logs} />}
                    />

                    <Route path="/addset" element={<AddSet />} />
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
