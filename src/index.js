import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Messages from './components/Messages'
import NewMessage from './components/NewMessage';

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
                <li>
                    <Link to="/newMessage">New Message</Link>
                </li>
            </ul>
            <Route exact="/" component={App} />
            <Route path="/messages" component={Messages} />
            <Route path="/newMessage" component={NewMessage} />
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))