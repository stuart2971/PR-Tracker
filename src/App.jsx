import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import AddSet from "./Pages/AddSet";
import LoginPage from "./Pages/LoginPage";

function App() {
    console.log(import.meta.env.VITE_CLIENT_ID);
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/dashboard/:userId" element={<Dashboard />} />
                    <Route path="/" exact element={<LoginPage />} />
                    <Route path="/addset" element={<AddSet />} />
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
