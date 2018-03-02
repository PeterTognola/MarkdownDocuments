import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Import ace.
import AceEditor from "react-ace";
import 'brace/mode/markdown';
import 'brace/theme/tomorrow';

const renderField = (data) => {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
        data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
        data.input['aria-invalid'] = true;
    }

    let input = <input type="text" />;

    if (data.type === "ace") {
        input = <AceEditor
                    mode="markdown"
                    theme="tomorrow"
                    id={`document_${data.input.name}`}
                    name={data.input.name}
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    fontSize={14}
                    wrapEnabled={true}
                    showPrintMargin={true}
                    showGutter={false}
                    highlightActiveLine={true}
                    setOptions={{ enableBasicAutocompletion: false, enableLiveAutocompletion: false, enableSnippets: false, showLineNumbers: false, tabSize: 2 }} />;
    } else {
        input = <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`document_${data.input.name}`} />;
    }

    return (
        <div className={`form-group ${hasError ? 'has-error' : ''}`}>
            {input}

            {hasError && <span className="help-block" id={`document_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
        </div>
    );
};

class Form extends Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="page">
                <form onSubmit={handleSubmit}>
                    <Field component={renderField} name="title" type="text" placeholder="The title..." required={true} />
                    <Field component={renderField} name="body" type="ace" placeholder="The body..." required={true} />

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({form: 'document', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);