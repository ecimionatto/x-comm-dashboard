import React, {Component} from 'react';

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'template';

class NewTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = null;
    }

    handleSubmit(event) {
        event.preventDefault();

        const jsonBody = JSON.stringify({
            message: event.target.message.value,
        });

        console.log(jsonBody)

        fetch(API + DEFAULT_QUERY, {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: jsonBody
        });

        window.location.pathname = "templates";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <h3 className="modal-title">New Message</h3>
                    <div className="card-header">
                        <p className="card-subtitle">Message:</p>
                        <textarea rows="4" cols="50" id="message" name="message" type="text" required/>
                        <p className="card-text">
                            <button>save</button>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
};

export default NewTemplate
