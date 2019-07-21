import React, {Component} from 'react';

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'settings';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {
                id: 1,
                slackWebHook: "",
                smtpUser: "",
                smtpPass: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        fetch(API + DEFAULT_QUERY, {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then((data) => {
                if (data.length > 0) {
                    this.setState({settings: data[0]})
                }
            })
            .catch(console.log)
    }


    handleSubmit(event) {

        if (event) {

            event.preventDefault();

            const jsonBody = JSON.stringify({
                id: 1,
                slackWebHook: event.target.form.slackWebHook.value,
                smtpUser: event.target.form.smtpUser.value,
                smtpPass: event.target.form.smtpPass.value
            });

            console.log(jsonBody)

            fetch(API + DEFAULT_QUERY + '/1', {
                crossDomain: true,
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: jsonBody
            });
            this.fetchData()
        }
    }

    render() {
        return (
            <form>
                <div className="container">
                    <h3 className="modal-title">Settings</h3>
                    <div className="card-header">
                        <input className="card-text" id="slack-webhook"
                               value={this.state.settings.id}
                               id="id"
                               type="hidden" required/>
                        <p className="card-subtitle">Slack Webhook:</p>
                        <input className="card-text w-50" id="slack-webhook"
                                  defaultValue={this.state.settings.slackWebHook}
                                  maxLength="300"
                                  id="slackWebHook"
                                  type="text" required/>
                        <p className="card-subtitle">SMTP User:</p>
                        <input className="card-text" id="smtp-user"
                               defaultValue={this.state.settings.smtpUser}
                               id="smtpUser"
                               type="text" required/>
                        <p className="card-subtitle">SMTP Password:</p>
                        <input className="card-text" id="smtp-pass"
                               defaultValue={this.state.settings.smtpPass}
                               id="smtpPass"
                               type="password" required/>
                        <p className="card-text">
                            <button type="button" className="btn btn-dark"
                                    onClick={this.handleSubmit}>save
                            </button>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
};

export default Settings
