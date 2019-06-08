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
                message: event.target.message.value,
                address: event.target.address.value,
                type: event.target.type.value

            })
        });

        window.location.pathname = "messages";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <p className="card-subtitle">Type:</p>
                    <select className="card-text" id="type" name="type">
                        <option value="SLACK">Slack</option>
                        <option value="EMAIL">EMail</option>
                    </select>
                    <p className="card-subtitle">Address to:</p>
                    <textarea className="card-text" id="address" name="address" type="text"/>

                    <p className="card-subtitle">Message:</p>
                    <textarea id="message" name="message" type="text"/>

                    <p className="card-text">
                        <button>save</button>
                    </p>
                </div>
            </form>
        );
    }
};

export default NewMessage
