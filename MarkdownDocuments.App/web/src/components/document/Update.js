import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { success } from '../../actions/document/create';
import { retrieve, update, reset } from '../../actions/document/update';
import { del, loading, error } from '../../actions/document/delete';
import {templates} from "../../utils/templates";

class Update extends Component {
  static propTypes = {
    retrieveError: PropTypes.string,
    retrieveLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?')) this.props.del(this.props.retrieved);
  };

  render() {
    if (this.props.deleted) return <Redirect to=".."/>;

    let item = this.props.updated ? this.props.updated : this.props.retrieved;

    if (item != null) item = item.value;

    return <div>
        <div className="navigation">
            <Link to=".." className="button"><span className="icon arrow arrow-left"></span></Link>
            <Link to="#save" onClick={document.getElementById("editorForm").submit} className="button"><span className="icon save"></span></Link> {/* todo HACK */}
            {/*{item && <Link to="#delete" onClick={this.del} className="button"><span className="icon delete"></span></Link>} /!* todo delete button *!/*/}
        </div>
      {this.props.created && <div className="alert alert-success" role="status">{this.props.created['id']} created.</div>}
      {this.props.updated && <div className="alert alert-success" role="status">{this.props.updated['id']} updated.</div>}
      {(this.props.retrieveLoading || this.props.updateLoading || this.props.deleteLoading) && templates.loading()}
      {this.props.retrieveError && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.retrieveError}</div>}
      {this.props.updateError && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.updateError}</div>}
      {this.props.deleteError && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.deleteError}</div>}

      {item && <Form id="editorForm" onSubmit={values => this.props.update(item, values)} initialValues={item}/>}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    retrieveError: state.documentReducers.update.retrieveError,
    retrieveLoading: state.documentReducers.update.retrieveLoading,
    updateError: state.documentReducers.update.updateError,
    updateLoading: state.documentReducers.update.updateLoading,
    deleteError: state.documentReducers.del.error,
    deleteLoading: state.documentReducers.del.loading,
    created: state.documentReducers.create.created,
    deleted: state.documentReducers.del.deleted,
    retrieved: state.documentReducers.update.retrieved,
    updated: state.documentReducers.update.updated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    update: (item, values) => dispatch(update(item, values)),
    del: item => dispatch(del(item.value)),
    reset: () => {
      dispatch(reset());
      dispatch(error(null));
      dispatch(loading(false));
      dispatch(success(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);