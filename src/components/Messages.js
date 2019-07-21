import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth0} from "../react-auth0-wrapper";

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcomm';

function Messages(props) {

    const [communications, setCommunications] = useState([]);
    const {user} = useAuth0();

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = () => {
        fetch(API + DEFAULT_QUERY, {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then((data) => {
                setCommunications(data)
            })
            .catch(console.log)
    }

    const deleteMessage = id => {
        fetch(API + DEFAULT_QUERY + "/" + id, {
            crossDomain: true,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: {'user': user.email}
        }).catch(console.log)
    }

    return (
        <div className="container">
            <h3 className="modal-title">Messages</h3>
            <p>
                <Link className="btn btn-info" to="/newMessage">New</Link>
            </p>
            {communications.length === 0 ? "no records" : communications.map(message => (
                <div className="card">
                    <h5 className="card-header">{message.id} - {message.status}</h5>
                    <div className="card-body">
                        <p className="card-text">{message.scheduledTime}</p>
                        <p className="card-text">emailTo: {message.emailTo ? message.emailTo : "N/A"}</p>
                        <p className="card-text">slackTo: {message.slackTo ? message.slackTo : "N/A"}</p>
                        <p className="card-text">{message.message}</p>
                        <p className="card-text">created by: {message.user}</p>
                        <button className="btn btn-danger" value={message.id}
                                onClick={() => deleteMessage(message.id)}>remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )


}

export default Messages;
