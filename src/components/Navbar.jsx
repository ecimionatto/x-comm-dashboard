import {Link, Route} from "react-router-dom";
import React from "react";
import {useAuth0} from "../react-auth0-wrapper";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard"
import Messages from "./Messages"
import Templates from "./Templates"
import NewMessage from "./NewMessage"
import NewTemplate from "./NewTemplate"

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (

        <div>
            {!isAuthenticated && (
                <button
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
                </button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {isAuthenticated && (
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/messages">Messages</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/templates">Templates</Link>
                            </li>
                        </ul>
                    </div>

                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/templates" component={Templates}/>

                    <Link className="hide" to="/newMessage"/>
                    <Link className="hide" to="/newTemplate"/>
                    <Route path="/newMessage" component={NewMessage}/>
                    <Route path="/newTemplate" component={NewTemplate}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                </div>

            )}
        </div>

    );
};

export default NavBar;