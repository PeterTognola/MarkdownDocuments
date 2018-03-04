import React, {Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "../../forms/account/Login";
import { login, loading, error } from "../../actions/account/login";

class Login extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        loggedIn: PropTypes.object,
        login: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        if (this.props.loggedIn) {
            // todo temp hack until we can reload the getRoutes state.
            window.location.href = window.location.origin;
        }

        return (
            <div>
                {this.props.loading && <div className="alert alert-info" role="status">Loading...</div>}
                {this.props.error && <div className="alert alert-danger" role="alert">{this.props.error}</div>}

                <Form onSubmit={this.props.login} values={this.props.item}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.accountReducers.create.created,
        error: state.accountReducers.create.error,
        loading: state.accountReducers.create.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: values => dispatch(login(values)),
        reset: () => {
            dispatch(loading(false));
            dispatch(error(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
