import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/document/list';
import { success } from '../../actions/document/delete';
import { itemToLinks } from '../../utils/helpers';

class List extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.list(this.props.match.params.page && decodeURIComponent(this.props.match.params.page));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) nextProps.list(nextProps.match.params.page && decodeURIComponent(nextProps.match.params.page));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return <div>
        <header>
            <h1>My Documents</h1>
            <span className="author">
                {this.props.data.value && this.props.data.value.length} Documents <strong>|</strong> Last Edited 2 hours ago
            </span>
        </header>

      {this.props.loading && <div className="alert alert-info">Loading...</div>}
      {this.props.deletedItem && <div className="alert alert-success">{this.props.deletedItem['id']} deleted.</div>}
      {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}

        <div className="padded center"><Link to="/document/create" className="button"><span class="icon new"></span></Link></div>

      <div className="pages">
          {this.props.data.value && this.props.data.value.map(item =>
              <Link key={item["id"]} className="page" to={`/document/show/${encodeURIComponent(item['id'])}`}>
                  {/*<Link to={`/document/edit/${encodeURIComponent(item['id'])}`}>*/}
                  {/*<span className="glyphicon glyphicon-pencil" aria-hidden="true"/>*/}
                  {/*<span className="sr-only">Edit</span>{item['title'] ? itemToLinks(item['title']) : ''}
                      {item['creationDate'] ? itemToLinks(item['creationDate']) : ''}*/}
                  {/*</Link>*/}
                  <h1>
                      {item["title"]}
                  </h1>

                  <p>
                      {item["body"]}
                  </p>
              </Link>
          )}
      </div>

      {this.pagination()}
    </div>;
  }

  pagination() {
    const view = this.props.data['hydra:view'];
    if (!view) return;

    const {'hydra:first': first, 'hydra:previous': previous,'hydra:next': next, 'hydra:last': last} = view;

    return <nav aria-label="Page navigation">
        <Link to='.' className={`btn btn-default${previous ? '' : ' disabled'}`}><span aria-hidden="true">&lArr;</span> First</Link>
        <Link to={!previous || previous === first ? '.' : encodeURIComponent(previous)} className={`btn btn-default${previous ? '' : ' disabled'}`}><span aria-hidden="true">&larr;</span> Previous</Link>
        <Link to={next ? encodeURIComponent(next) : '#'} className={`btn btn-default${next ? '' : ' disabled'}`}>Next <span aria-hidden="true">&rarr;</span></Link>
        <Link to={last ? encodeURIComponent(last) : '#'} className={`btn btn-default${next ? '' : ' disabled'}`}>Last <span aria-hidden="true">&rArr;</span></Link>
    </nav>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.documentReducers.list.data,
    error: state.documentReducers.list.error,
    loading: state.documentReducers.list.loading,
    deletedItem: state.documentReducers.del.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    list: (page) => dispatch(list(page)),
    reset: () => {
      dispatch(reset());
      dispatch(success(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
