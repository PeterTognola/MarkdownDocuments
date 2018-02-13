import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Markdown from 'react-markdown';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.onChange = (e) => this.setState({ source: e.target.value })
    }

    render() {
        return (
            <div className="app">
                <textarea className="editor" id="document_body" defaultValue="test" onChange={this.onChange} />

                <Markdown className="preview" source={this.state ? this.state.source : "test"} escapeHtml />
            </div>
        );
    }
}

class Form extends Component {
    renderField(data) {
        const hasError = data.meta.touched && !!data.meta.error;
        if (hasError) {
            data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
            data.input['aria-invalid'] = true;
        }

        return (
            <div className={`form-group${hasError ? ' has-error' : ''}`}>
                <label htmlFor={`document_${data.input.name}`} className="control-label">{data.input.name}</label>
                <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`document_${data.input.name}`} className="form-control"/>
                {hasError && <span className="help-block" id={`document_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
            </div>
        );
    }

    // This form requires a bit of a hack.
    // The form needs to be submitted externally, using id "formEditor"
    // todo try not to use a ol'hack...
    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="page">
                <form onSubmit={handleSubmit} id="formEditor">
                    <Field component={this.renderField} name="title" type="text" placeholder="The title..." required={true} />
                    <Editor />
                    {/*<Field component={this.renderField} type="text" placeholder="The body..." required={true}/>*/}
                </form>
            </div>
        );
    }
}

export default reduxForm({form: 'document', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
