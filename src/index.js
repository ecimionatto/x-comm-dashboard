import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import App from './App'
import Messages from './components/Messages'
import NewMessage from './components/NewMessage';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.css';

const routing = (
    <Router>
        <h1 className="modal-title">X-Comm Communicator</h1>
        <div className="container-fluid">
            <Link className="card-link" to="/dashboard">Dashboard</Link>
            <Link className="card-link" to="/messages">Messages</Link>
            <Link className="card-link" to="/newMessage">New Message</Link>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/messages" component={Messages}/>
            <Route path="/newMessage" component={NewMessage}/>
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))