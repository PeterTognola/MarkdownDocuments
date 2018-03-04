import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Import react-toolbox.
import { Button } from "react-toolbox/lib/button";
import { Input } from "react-toolbox/lib/input";

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
            <form onSubmit={handleSubmit}>
                <Field component={renderField} name="firstName" type="text" placeholder="First Name" required={true} />
                <Field component={renderField} name="lastName" type="text" placeholder="Last Name" required={true} />

                <Button type="submit" raised primary>Update</Button>
            </form>
        );
    }
}

export default reduxForm({form: 'account', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);