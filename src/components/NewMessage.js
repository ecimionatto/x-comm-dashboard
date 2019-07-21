import React, {useEffect, useState} from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
import {useAuth0} from "../react-auth0-wrapper";

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'xcomm';

function NewMessage(props) {

    const [scheduledTime, setScheduledTime] = useState(new Date());
    const [emailToRequired, setEmailToRequired] = useState(true);
    const [slackToRequired, setSlackToRequired] = useState(true);
    const [templates, setTemplates] = useState([]);

    const recurrenceData = [
        {value: 'NEVER', label: 'never'},
        {value: 'DAILY', label: 'daily'},
        {value: 'WEEKLY', label: 'weekly'},
        {value: 'MONTHLY', label: 'monthly'}];

    const [message, setMessage] = useState('');
    const [slackTo, setSlackTo] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [recurrence, setRecurrence] = useState('never');

    const {user} = useAuth0();

    useEffect(() => {
        fetchTemplates()
    }, []);

    const handleEmailToChange = e => {
        if (e.target.value.length > 0) {
            setSlackToRequired(false)
            setEmailToRequired(true)
        } else {
            setSlackToRequired(true)
            setEmailToRequired(true)
        }
    }

    const handleSlackToChange = e => {
        if (e.target.value.length > 0) {
            setSlackToRequired(true)
            setEmailToRequired(false)
        } else {
            setSlackToRequired(true)
            setEmailToRequired(true)
        }
    }

    const loadMessage = event => {
        console.log(event)
        if (event) {
            setMessage(event.value)
        }
    }

    const loadRecurrence = event => {
        if (event) {
            setRecurrence(event.value)
        }
    };

    const dateChange = date => {
        if (date) {
            setScheduledTime(date)
        }
    };

    const acceptText = event => {
        if (event) {
            setMessage(event.value);
        }
    }

    const handleSubmit = event => {
        if (event) {
            event.preventDefault()
            const jsonBody = JSON.stringify({
                message: event.target.message.value,
                emailTo: event.target.emailTo.value,
                slackTo: event.target.slackTo.value,
                scheduledTime: event.target.scheduledTime.value,
                user: user.email,
                recurrence: event.target.recurrence.value
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

            return props.history.push("/messages")
        }
    }

    const fetchTemplates = () => {
        fetch(API + "template", {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then((data) => {
                setTemplates(data.map(data => ({label: data.name, value: data.message})))
            })
            .catch(console.log);
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h3 className="modal-title">New Message</h3>
                <div className="card-header">
                    <p className="card-subtitle">Email To:</p>
                    <input className="card-text w-50" id="emailTo"
                           onChange={handleEmailToChange}
                           name="emailTo"
                           type="email"
                           required={emailToRequired}/>

                    <p className="card-text"></p>

                    <p className="card-subtitle">Slack To:</p>
                    <input className="card-text w-50" id="slackTo"
                           onChange={handleSlackToChange}
                           name="slackTo"
                           type="text"
                           required={slackToRequired}/>

                    <p className="card-text"></p>

                    <p className="card-subtitle">Message:</p>
                    <Select className="card-text w-25" id="template"
                            options={templates}
                            onChange={loadMessage}/>

                    <textarea className="card-text" rows="4" cols="50" id="message"
                              value={message}
                              onChange={acceptText}
                              name="message"
                              required/>

                    <p className="card-text"></p>

                    <p className="card-subtitle">Schedule:</p>
                    <DateTimePicker className="card-text" id="scheduledTime" name="scheduledTime"
                                    onChange={dateChange}
                                    value={scheduledTime} required/>

                    <p className="card-text"></p>

                    <p className="card-subtitle">Recurrence:</p>
                    <Select className="card-text w-25" id="recurrence"
                            options={recurrenceData}
                            defaultValue={{ label: "never", value: "NEVER" }}
                            onChange={loadRecurrence}/>
                    <input type="hidden" id="recurrence" value={recurrence}/>

                    <p className="card-text"></p>

                    <p>
                        <button className="btn btn-dark">save</button>
                    </p>
                </div>
            </div>
        </form>
    );
};

export default NewMessage
