import React from "react";
import NavBar from "./components/Navbar";
// New - import the React Router components, and the Profile page component
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard"
import Messages from "./components/Messages"
import Templates from "./components/Templates"
import NewMessage from "./components/NewMessage"
import NewTemplate from "./components/NewTemplate"


function App() {
    return (
        <div className="card">
            {/* New - use BrowserRouter to provide access to /profile */}
            <BrowserRouter>
                <header>
                    <div className="card text-white bg-dark mb-3">
                        <h1 className="modal-title">X-Comm Communicator</h1>
                    </div>

                </header>
                <NavBar/>
            </BrowserRouter>
        </div>
    );
}

export default App;