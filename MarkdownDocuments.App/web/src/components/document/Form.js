import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SimpleMDE from 'react-simplemde-editor';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: ""
        };

        this.onChange = (e) => {
            this.setState({ source: e });
            console.log(e);
        };
    }

    render() {
        return (
            <div>
                <SimpleMDE
                    onChange={this.onChange}
                    value={this.state.textValue}
                    options={{
                        autofocus: true,
                        spellChecker: false
                    }}
                />

                {/*{<Field component={renderField} defaultValue="test" name="body" type="textarea" required={false} value={} style={{display:"none"}} />}*/}
                {<textarea component={} id={`document_body`} />}
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
            <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} className={data.className} id={`document_${data.input.name}`} />

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
