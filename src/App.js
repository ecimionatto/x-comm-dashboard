import React from "react";
import NavBar from "./components/Navbar";
// New - import the React Router components, and the Profile page component
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="card">
            {/* New - use BrowserRouter to provide access to /profile */}
            <BrowserRouter>
                <h1 className="text-white bg-dark">X-Comm Communicator</h1>
                <NavBar/>
            </BrowserRouter>
        </div>
    );
}

export default App;