import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const renderField = (data) => {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
        data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
        data.input['aria-invalid'] = true;
    }

    return (
        <div className={`form-group ${hasError ? 'has-error' : ''}`}>
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

        return ( // todo sending as GET for some reason.
            <div className="page">
                <form onSubmit={handleSubmit} id="formEditor">
                    <Field component={renderField} name="title" type="text" placeholder="The title..." className="pretend-title" required={true} />
                    <Field component={renderField} name="body" type="text" placeholder="The body..." required={true} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({form: 'document', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
