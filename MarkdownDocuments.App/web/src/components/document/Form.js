import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Editor, EditorState} from 'draft-js';

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

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field component={this.renderField} name="title" type="text" placeholder="The title..." required={true} />
                <Field component={this.renderField} name="body" type="text" placeholder="The body..." required={true}/>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default reduxForm({form: 'document', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
