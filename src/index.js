import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Messages from './components/Messages'
import NewMessage from './components/NewMessage';
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import NewTemplate from './components/NewTemplate';

import 'bootstrap/dist/css/bootstrap.css';

const routing = (
    <Router>
        <h1 className="modal-title">X-Comm Communicator</h1>
        <div className="card">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/dashboard">Dashboard</Link>
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
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))