import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Markdown from 'react-markdown';

const DEFAULT_HEIGHT = 200;

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: DEFAULT_HEIGHT
        };

        this.onChange = (e) => {
            this.setState({ source: e.target.value, height: e.target.scrollHeight });
            console.log(e.target.scrollHeight + " & " + e.target.style.height);
        };
    }

    render() {
        return (
            <div className="app">
                <Field component={renderField} defaultValue="test" name="body" type="textarea" placeholder="The title..." required={true} style={{height:this.state.height}} onChange={this.onChange} />

                <Markdown className="preview" source={this.state && this.state.source} escapeHtml />
            </div>
        );
    }
}

const renderField = (data) => {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
        data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
        data.input['aria-invalid'] = true;
    }

    return (
        <div className={`form-group${hasError ? ' has-error' : ''}`}>
            {
                data.type === "textarea"
                    ? <textarea {...data.input} id={`document_${data.input.name}`} required={data.required} placeholder={data.placeholder} step={data.step} />
                    : <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} className={data.className} id={`document_${data.input.name}`} />
            }

            {hasError && <span className="help-block" id={`document_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
        </div>
    );
}

class Form extends Component {
    // This form requires a bit of a hack.
    // The form needs to be submitted externally, using id "formEditor"
    // todo try not to use a ol'hack...
    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="page">
                <form onSubmit={handleSubmit} id="formEditor">
                    <Field component={renderField} name="title" type="text" placeholder="The title..." className="pretend-title" required={true} />
                    <Editor />
                </form>
            </div>
        );
    }
}

export default reduxForm({form: 'document', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
