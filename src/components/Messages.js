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

    componentWillMount() {
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

    deleteMessage(id) {
        fetch(API + DEFAULT_QUERY + "/" + id, {
            crossDomain: true,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <h3 className="modal-title">Messages</h3>
                <p>
                    <a className="btn btn-info" href="newMessage">New</a>
                </p>
                {this.state.communications.length === 0 ? "no records" : this.state.communications.map(message => (
                    <div className="card">
                        <h5 className="card-header">{message.id} - {message.status}</h5>
                        <div className="card-body">
                            <p className="card-text">{message.scheduledTime}</p>
                            <p className="card-text">emailTo: {message.emailTo ? message.emailTo : "N/A"}</p>
                            <p className="card-text">slackTo: {message.slackTo ? message.slackTo : "N/A"}</p>
                            <p className="card-text">{message.message}</p>
                            <button className="btn btn-danger" value={message.id}
                                    onClick={() => this.deleteMessage(message.id)}>remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}

export default Messages;
