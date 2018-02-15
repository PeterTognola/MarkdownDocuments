import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SimpleMDE from 'react-simplemde-editor';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: ""
        };

        this.onChange = (data) => {
            this.setState({source: data});
        };
    }

    // todo stateless document_body...
    render() {
        return (
            <div>
                <SimpleMDE
                    onChange={this.onChange}
                    value={this.state.source}
                    options={{
                        autofocus: true,
                        spellChecker: false
                    }}
                />

                <Field component={(data) => { this.state.source === "" ? this.setState({source:data.input.value}) : this.state.source; return renderField(data); }} style={{display:"none"}} name="body" />
            </div>
        );
    }
}

const renderField = (data) => {
    const hasError = data.meta.touched && !!data.meta.error;
    // if (hasError) {
    //     data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
    //     data.input['aria-invalid'] = true;
    // }

    return (
        <div className={`form-group${hasError ? ' has-error' : ''}`}>
            <input {...data.input} type={data.type} step={data.step}required={data.required} placeholder={data.placeholder} className={data.className} style={data.style} id={`document_${data.input.name}`} />

            {hasError && <span className="help-block" id={`document_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
        </div>
    );
}

class Form extends Component {
    render() {
        const { handleSubmit } = (data) => {
            console.log(data);
            return this.props;
        };

        console.log(this.props);

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
