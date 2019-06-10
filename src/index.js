import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import App from './App'
import Messages from './components/Messages'
import NewMessage from './components/NewMessage';
import 'bootstrap/dist/css/bootstrap.css';

const routing = (
    <Router>
        <div className="container-fluid">
            <Link className="card-link" to="/">Home</Link>
            <Link className="card-link" to="/messages">Messages</Link>
            <Link className="card-link" to="/newMessage">New Message</Link>
            <Route path="/" component={App}/>
            <Route path="/messages" component={Messages}/>
            <Route path="/newMessage" component={NewMessage}/>
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))