import React, {Component} from 'react';
import Communications from "./components/communications";
import FormContainer from './components/FormContainer';


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
            <div className="container">
                <FormContainer/>

                <Communications communications={this.state.communications}/>
            </div>
        )
    }

}

export default App;
