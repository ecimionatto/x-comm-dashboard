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

                <div>
                    <h1>Messages</h1>
                    {this.state.communications.map((c) => (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{c.id}</h5>
                                <p className="card-text">{c.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

export default Messages;
