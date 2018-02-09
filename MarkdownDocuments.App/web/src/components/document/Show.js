import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {retrieve, reset} from '../../actions/document/show';
import { del, loading, error } from '../../actions/document/delete';

class Show extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    retrieved: PropTypes.object,
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleted: PropTypes.object,
    del: PropTypes.func.isRequired
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

    const item = this.props.retrieved;

    return (<div>
      <h1>Show {item && item['@id']}</h1>

      {this.props.loading && <div className="alert alert-info" role="status">Loading...</div>}
      {this.props.error && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.error}</div>}
      {this.props.deleteError && <div className="alert alert-danger" role="alert"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {this.props.deleteError}</div>}

      {item && <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>{item['id']}</td>
            </tr>
            <tr>
              <td>isbn</td>
              <td>{item['isbn']}</td>
            </tr>
            <tr>
              <td>description</td>
              <td>{item['description']}</td>
            </tr>
            <tr>
              <td>author</td>
              <td>{item['author']}</td>
            </tr>
            <tr>
              <td>title</td>
              <td>{item['title']}</td>
            </tr>
            <tr>
              <td>publicationDate</td>
              <td>{item['publicationDate']}</td>
            </tr>
          </tbody>
        </table>
      </div>
      }
      <Link to=".." className="btn btn-default">Back to list</Link>
      {item && <Link to={`/document/edit/${encodeURIComponent(item['@id'])}`}>
        <button className="btn btn-warning">Edit</button>
        </Link>
      }
      <button onClick={this.del} className="btn btn-danger">Delete</button>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.document.show.error,
    loading: state.document.show.loading,
    retrieved:state.document.show.retrieved,
    deleteError: state.document.del.error,
    deleteLoading: state.document.del.loading,
    deleted: state.document.del.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieve: id => dispatch(retrieve(id)),
    del: item => dispatch(del(item)),
    reset: () => {
      dispatch(reset());
      dispatch(error(null));
      dispatch(loading(false));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
