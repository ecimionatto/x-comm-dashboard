import React, {Component} from 'react';

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'template';

class NewTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = null;
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {

        if (event) {

            event.preventDefault();

            const jsonBody = JSON.stringify({
                name: event.target.form.name.value,
                message: event.target.form.message.value
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

            return this.props.history.push("/templates")
        }
    }

    render() {
        return (
            <form>
                <div className="container">
                    <h3 className="modal-title">New Template</h3>
                    <div className="card-header">
                        <p className="card-subtitle">Name:</p>
                        <input className="card-text" rows="4" cols="50" id="name" name="name" type="text" required/>
                        <p className="card-subtitle">Message:</p>
                        <textarea className="card-text" rows="4" cols="50" id="message" name="message" required/>
                        <p className="card-text">
                            <button type="button" className="btn btn-dark" onClick={this.handleSubmit}>save</button>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
};

export default NewTemplate
