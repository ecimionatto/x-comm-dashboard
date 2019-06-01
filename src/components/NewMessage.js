import React, {Component} from 'react';
/* Import Components */

class NewMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                name: '',
                email: '',
                age: '',
                gender: '',
                expertise: '',
                about: ''

            },

            genderOptions: ['Male', 'Female', 'Others'],
            skillOptions: ['Programming', 'Development', 'Design', 'Testing']

        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    /* This life cycle hook gets executed when the component mounts */

    handleFormSubmit() {
        // Form submission logic
    }

    handleClearForm() {
        // Logic for resetting the form
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h3>New Message</h3>


            </form>
        );
    }
};

export default NewMessage
