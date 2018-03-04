import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Import ace.
import AceEditor from "react-ace";
import "brace/mode/markdown";
import "brace/theme/tomorrow";

// Import react-toolbox.
import { Button } from "react-toolbox/lib/button";
import { Input } from "react-toolbox/lib/input";

// Import Ace style mod.
import aceStyles from "../../shared/ace_theme_mod.scss";

const renderEditor = (data) => {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
        data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
        data.input['aria-invalid'] = true;
    }

    return (
        <div className={`form-group ${hasError ? 'has-error' : ''}`}>
            <AceEditor
                mode="markdown"
                theme="tomorrow"
                style={{width:"100%"}}
                onLoad={this.onLoad}
                value={data.input.value || data.placeholder} // todo When value is "" it is set to placeholder (at any point).
                className={aceStyles.editor}
                onChange={param => {data.input.onChange(param)}}
                fontSize={14}
                wrapEnabled={true}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                id={`document_${data.input.name}`}
                name={data.input.name}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2
                }} />

            {hasError && <span className="help-block" id={`document_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
        </div>
    );
};

const renderField = (data) => {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
        data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
        data.input['aria-invalid'] = true;
    }

    return (
        <div className={`form-group ${hasError ? 'has-error' : ''}`}>
            <Input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`document_${data.input.name}`} />

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
                    <Field component={renderEditor} name="body" placeholder="The body..." required={true} />

                    <Button type="submit" raised primary>Submit</Button>
                </form>
            </div>
        );
    }
}

export default reduxForm({form: 'document', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);