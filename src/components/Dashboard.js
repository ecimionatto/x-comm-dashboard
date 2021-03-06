import React, {Component} from 'react';

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'dashboard';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard: [],
        };
    }

    componentDidMount() {
        this.fetchMessages()
        this.interval = setInterval(() => this.fetchMessages(), 5000);
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
                this.setState({dashboard: data})
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <h3 className="modal-title">Dashboard</h3>
                <div className="card-header">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">sent: {this.state.dashboard[0] ? this.state.dashboard[0].sent : 0}</h5>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">errors: {this.state.dashboard[0] ? this.state.dashboard[0].failed : 0}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;
