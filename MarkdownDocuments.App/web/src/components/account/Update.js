import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../../forms/account/Update';
import { success } from '../../actions/account/create';
import { retrieve, update, reset } from '../../actions/account/update';
import { loading, error } from '../../actions/document/delete';
import { templates} from "../../utils/templates";

class Update extends Component {
    static propTypes = {
        retrieveError: PropTypes.string,
        retrieveLoading: PropTypes.bool.isRequired,
        updateError: PropTypes.string,
        updateLoading: PropTypes.bool.isRequired,
        retrieved: PropTypes.object,
        updated: PropTypes.object,
        retrieve: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.retrieve(decodeURIComponent(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.reset();
    }

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
                {item && <Form onSubmit={values => this.props.update(values)} initialValues={item} />}

                {(this.props.retrieveLoading || this.props.updateLoading) && templates.loading()}

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
        retrieveError: state.accountReducers.update.retrieveError,
        retrieveLoading: state.accountReducers.update.retrieveLoading,
        updateError: state.accountReducers.update.updateError,
        updateLoading: state.accountReducers.update.updateLoading,
        created: state.accountReducers.create.created,
        retrieved: state.accountReducers.update.retrieved,
        updated: state.accountReducers.update.updated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: () => dispatch(retrieve()),
        update: (values) => dispatch(update(values)),
        reset: () => {
            dispatch(reset());
            dispatch(error(null));
            dispatch(loading(false));
            dispatch(success(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);