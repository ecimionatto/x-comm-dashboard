import React, {Component} from 'react';
import DateTimePicker from 'react-datetime-picker'

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcomm';

class NewMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scheduledTime: new Date()
        };
        this.dateChange = this.dateChange.bind(this);
    }

    dateChange(date) {
        this.setState({
            scheduledTime: date
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        var value = [];
        for (var i = 0, l = event.target.type.length; i < l; i++) {
            if (event.target.type[i].selected) {
                value.push(event.target.type[i].value);
            }
        }

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
                types: value,
                scheduledTime: event.target.scheduledTime.value
            })
        });

        window.location.pathname = "messages";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <p className="card-subtitle">Type:</p>
                    <select multiple className="card-text" id="type" name="type">
                        <option value="SLACK">Slack</option>
                        <option value="EMAIL">EMail</option>
                    </select>
                    <p className="card-subtitle">Address to:</p>
                    <textarea className="card-text" id="address" name="address" type="text"/>

                    <p className="card-subtitle">Message:</p>
                    <textarea id="message" name="message" type="text"/>

                    <p className="card-subtitle">Schedule:</p>
                    <DateTimePicker id="scheduledTime" name="scheduledTime" onChange={this.dateChange} value={this.state.scheduledTime}/>

                    <p className="card-text">
                        <button>save</button>
                    </p>
                </div>
            </form>
        );
    }
};

export default NewMessage
