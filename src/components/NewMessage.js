import React, {Component} from 'react';

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcomm';

class NewMessage extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(API + DEFAULT_QUERY, {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: event.target.message.value
            })
        });

        window.location.pathname = "messages";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="message">enter the message</label>
                <input id="message" name="message" type="text"/>
                <button>save</button>
            </form>
        );
    }
};

export default NewMessage
