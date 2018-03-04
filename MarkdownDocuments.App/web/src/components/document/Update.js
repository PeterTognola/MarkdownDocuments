import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { success } from '../../actions/document/create';
import { retrieve, update, reset } from '../../actions/document/update';
import { del, loading, error } from '../../actions/document/delete';
import { templates} from "../../shared/helpers/templates";

// Import Theme.
import styles from "../../shared/styles/react_overrides.scss";
import { Button, IconButton, Snackbar } from "react-toolbox";

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
        reset: PropTypes.func.isRequired
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

        if (this.props.updated) {
            this.props.history.push(`/document/show/${encodeURIComponent(this.props.updated["id"])}`);
            // todo send state of updated to show component.
            // todo message to say document updated.
        }

        return (
            <div>
                <div style={{margin:"0 15px"}}>
                    {item && <Link to={`/document/show/${encodeURIComponent(item["id"])}`}><IconButton className={styles.largeIcon} icon="cancel" /></Link>/* todo onclick, ask if user is sure as they would lose their work. */}

                    {item && <div style={{float:"right", padding:"0 15px"}}><IconButton onClick={this.del} icon="delete" className={styles.largeIconDanger} /></div>}
                </div>

                <hr />

                {item && <Form id="editorForm" onSubmit={values => this.props.update(item, values)} initialValues={item} />}

                {(this.props.retrieveLoading || this.props.updateLoading || this.props.deleteLoading) && templates.loading()}

                {/* the below needs moving out into the "show" or "list" state. */}
                {this.props.created && <div role="status">{this.props.created['id']} created.</div>}
                {this.props.retrieveError && <div role="alert">{this.props.retrieveError}</div>}
                {this.props.updateError && <div role="alert">{this.props.updateError}</div>}
                {this.props.deleteError && <div role="alert">{this.props.deleteError}</div>}
            </div>
        );
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
        updated: state.documentReducers.update.updated
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);