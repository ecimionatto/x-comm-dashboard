import React, {Component} from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
import {useAuth0} from "../react-auth0-wrapper";

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcomm';

const useAuth0Value = () => {
    const {user} = useAuth0();
    return user
};

class NewMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scheduledTime: new Date(),
            emailToRequired: true,
            slackToRequired: true,
            message: "",
            user: useAuth0Value,
            templates: []
        };
        this.dateChange = this.dateChange.bind(this);
        this.handleEmailToChange = this.handleEmailToChange.bind(this);
        this.handleSlackToChange = this.handleSlackToChange.bind(this);
        this.loadMessage = this.loadMessage.bind(this);
        this.acceptText = this.acceptText.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        this.fetchTemplates()
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

    loadMessage(event) {
        console.log(event)
        if (event) {
            this.setState({message: event.value})
        }
    }

    dateChange(date) {
        this.setState({
            scheduledTime: date
        });
    }

    acceptText(event) {
        if (event) {
            this.setState({
                message: event.value
            });
        }
    }

    handleSubmit(event) {
        if (event) {
            event.preventDefault();

            const jsonBody = JSON.stringify({
                message: event.target.form.message.value,
                emailTo: event.target.form.emailTo.value,
                slackTo: event.target.form.slackTo.value,
                scheduledTime: event.target.form.scheduledTime.value,
                user: useAuth0Value.email
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

            return this.props.history.push("/messages")
        }
    }

    fetchTemplates() {
        fetch(API + "template", {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    templates:
                        data.map(data => ({label: data.name, value: data.message}))
                })
            })
            .catch(console.log);
    }

    render() {

        return (
            <form>
                <div className="container">
                    <h3 className="modal-title">New Message</h3>
                    <div className="card-header">
                        <p className="card-subtitle">Email To:</p>
                        <input className="card-text w-50" id="emailTo"
                               onChange={this.handleEmailToChange}
                               name="emailTo"
                               type="email"
                               value={this.state.emailTo}
                               required={(this.state.emailToRequired)}/>

                        <p className="card-subtitle">Slack To:</p>
                        <input className="card-text w-50" id="slackTo"
                               onChange={this.handleSlackToChange}
                               name="slackTo"
                               type="text"
                               value={this.state.slackTo}
                               required={(this.state.slackToRequired)}/>

                        <p className="card-subtitle">Message:</p>
                        <Select className="card-text" id="template"
                                options={this.state.templates}
                                onChange={this.loadMessage}/>

                        <textarea className="card-text" rows="4" cols="50" id="message"
                                  value={this.state.message}
                                  onChange={this.acceptText}
                                  name="message"
                                  required/>

                        <p className="card-subtitle">Schedule:</p>
                        <DateTimePicker className="card-text" id="scheduledTime" name="scheduledTime"
                                        onChange={this.dateChange}
                                        value={this.state.scheduledTime} required/>

                        <p className="card-text"></p>
                        <p>
                            <button type="button"
                                    className="btn btn-dark"
                                    onClick={this.handleSubmit}>save
                            </button>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
};

export default NewMessage
