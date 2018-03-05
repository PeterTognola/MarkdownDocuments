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
                <h2 style={{margin:0}}>
                    Account Login
                </h2>
                <Field component={renderField} name="email" type="email" placeholder="Email" required={true} />
                <Field component={renderField} name="password" type="password" placeholder="Password" required={true} />

                <Button type="submit" raised primary>Login</Button>
            </form>
        );
    }
}

export default reduxForm({form: 'account', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);