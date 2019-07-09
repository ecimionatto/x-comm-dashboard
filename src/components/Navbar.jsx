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
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

    return (
        <span>
            {!isAuthenticated && (
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className="nav-link" href="" onClick={() => loginWithRedirect({})}>
                                    Log in
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

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
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li>
                                <a className="nav-link" href="" onClick={() => logout()}>Log out</a>
                            </li>
                        </ul>
                    </div>

                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/templates" component={Templates}/>

                    <Link className="hide" to="/newMessage"/>
                    <Link className="hide" to="/newTemplate"/>
                    <PrivateRoute path="/newMessage" component={NewMessage}/>
                    <PrivateRoute path="/newTemplate" component={NewTemplate}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                </div>
            )}
        </span>

    );
};

export default NavBar;