import React, {Component} from 'react';
import DateTimePicker from 'react-datetime-picker'

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcomm';

class NewMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scheduledTime: new Date(),
            emailToRequired: true,
            slackToRequired: true
        };
        this.dateChange = this.dateChange.bind(this);
        this.handleEmailToChange = this.handleEmailToChange.bind(this);
        this.handleSlackToChange = this.handleSlackToChange.bind(this);
    }

    handleEmailToChange(event) {
        if (event.target.value.length > 0) {
            this.setState({slackToRequired: false})
            this.setState({emailToRequired: true})
        } else {
            this.setState({slackToRequired: true})
            this.setState({emailToToRequired: true})
        }
    }

    handleSlackToChange(event) {
        if (event.target.value.length > 0) {
            this.setState({slackToRequired: true})
            this.setState({emailToRequired: false})
        } else {
            this.setState({slackToRequired: true})
            this.setState({emailToToRequired: true})
        }
    }

    dateChange(date) {
        this.setState({
            scheduledTime: date
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const jsonBody = JSON.stringify({
            message: event.target.message.value,
            emailTo: event.target.emailTo.value,
            slackTo: event.target.slackTo.value,
            scheduledTime: event.target.scheduledTime.value
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

        window.location.pathname = "messages";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <h3 className="modal-title">New Message</h3>
                    <div className="card-header">
                        <p className="card-subtitle">Email To:</p>
                        <input className="card-text" id="emailTo" onChange={this.handleEmailToChange} name="emailTo"
                               type="email"
                               required={(this.state.emailToRequired)}/>

                        <p className="card-subtitle">Slack To:</p>
                        <input className="card-text" id="slackTo" onChange={this.handleSlackToChange} name="slackTo"
                               type="text"
                               required={(this.state.slackToRequired)}/>

                        <p className="card-subtitle">Message:</p>
                        <textarea rows="4" cols="50" id="message" name="message" type="text" required/>

                        <p className="card-subtitle">Schedule:</p>
                        <DateTimePicker id="scheduledTime" name="scheduledTime" onChange={this.dateChange}
                                        value={this.state.scheduledTime} required/>

                        <p className="card-text">
                            <button>save</button>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
};

export default NewMessage
