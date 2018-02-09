import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends Component {
  renderField(data) {
    const hasError = data.meta.touched && !!data.meta.error;
    if (hasError) {
      data.input['aria-describedby'] = `document_${data.input.name}_helpBlock`;
      data.input['aria-invalid'] = true;
    }

    return <div className={`form-group${hasError ? ' has-error' : ''}`}>
      <label htmlFor={`document_${data.input.name}`} className="control-label">{data.input.name}</label>
      <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`document_${data.input.name}`} className="form-control"/>
      {hasError && <span className="help-block" id={`document_${data.input.name}_helpBlock`}>{data.meta.error}</span>}
    </div>;
  }

  render() {
    const { handleSubmit } = this.props;

    return <form onSubmit={handleSubmit}>
      <Field component={this.renderField} name="id" type="number" placeholder="" />
      <Field component={this.renderField} name="isbn" type="text" placeholder="The ISBN of the document" />
      <Field component={this.renderField} name="description" type="text" placeholder="A description of the item" required={true}/>
      <Field component={this.renderField} name="author" type="text" placeholder="The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably" required={true}/>
      <Field component={this.renderField} name="title" type="text" placeholder="The title of the document" required={true}/>
      <Field component={this.renderField} name="publicationDate" type="text" placeholder="The date on which the CreativeWork was created or the item was added to a DataFeed" required={true}/>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>;
  }
}

export default reduxForm({form: 'document', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
