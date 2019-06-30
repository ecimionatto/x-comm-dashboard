import React, {Component} from 'react';

const API = 'http://localhost:8080/';
const DEFAULT_QUERY = 'template';

class Templates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: [],
        };
    }

    componentDidMount() {
        this.fetchTemplates()
    }

    fetchTemplates() {
        fetch(API + DEFAULT_QUERY, {
            crossDomain: true,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({templates: data})
            })
            .catch(console.log)
    }

    deleteTemplate(id) {
        fetch(API + DEFAULT_QUERY + "/" + id, {
            crossDomain: true,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).catch(console.log)
            .then(setTimeout(() => this.fetchTemplates(), 1000))
    }

    render() {
        return (
            <div className="container">
                <div className="container">
                    <h3 className="modal-title">Templates</h3>
                    <p>
                        <a href="newTemplate">New</a>
                    </p>
                    <div className="card-header">
                        {this.state.templates.length === 0 ? "no records" : this.state.templates.map((template) => (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{template.message}</h5>
                                    <button value={template.id}
                                            onClick={() => this.deleteTemplate(template.id)}>remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

}

export default Templates;
