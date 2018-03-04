import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "../../forms/account/Create";
import { create, loading, error } from "../../actions/account/create";
import { templates } from "../../shared/helpers/templates"

class Create extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        created: PropTypes.object,
        create: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        if (this.props.created) return <Redirect to={`edit/${encodeURIComponent(this.props.created['id'])}`}/>;

        return (
            <div>
                {this.props.loading && templates.loading()}
                {this.props.error && <div className="alert alert-danger" role="alert">{this.props.error}</div>}

                <Form onSubmit={this.props.create} values={this.props.item}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        created: state.accountReducers.create.created,
        error: state.accountReducers.create.error,
        loading: state.accountReducers.create.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: values => dispatch(create(values)),
        reset: () => {
            dispatch(loading(false));
            dispatch(error(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
