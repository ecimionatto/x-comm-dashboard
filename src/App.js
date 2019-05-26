import React, {Component} from 'react';
import Communications from "./components/communications";

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcom';

class App extends Component {
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
            //     body: JSON.stringify({
            //         username: user,
            //         password: pass,
            //     })
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({communications: data})
            })
            .catch(console.log)
    }

    render() {
        return (
            <Communications communications={this.state.communications}/>
        )
    }

}

export default App;
