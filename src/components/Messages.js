import React, {Component} from 'react';

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcomm';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            communications: [],
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.fetchMessages(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchMessages() {
        fetch(API + DEFAULT_QUERY, {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({communications: data})
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <div className="container">
                    <h3 className="modal-title">Messages</h3>
                    <p>
                        <a href="newMessage">New</a>
                    </p>
                    <div className="card-header">
                        {this.state.communications.length === 0 ? "no records" : this.state.communications.map((c) => (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{c.id} - {c.status}</h5>
                                    <p className="card-text">{c.scheduledTime}</p>
                                    <p className="card-text">emailTo: {c.emailTo ? c.emailTo : "N/A"}</p>
                                    <p className="card-text">slackTo: {c.slackTo ? c.slackTo : "N/A"}</p>
                                    <p className="card-text">message: {c.message}</p>
                                    <span className="card-text">error: {c.error ? c.error : "none"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

}

export default Messages;
