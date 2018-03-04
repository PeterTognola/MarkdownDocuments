import React, {Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "../../forms/account/Login";
import { login, loading, error } from "../../actions/account/login";
import { templates } from "../../shared/helpers/templates";

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
            console.log(this.props.loggedIn);
        }

        return (
            <div>
                {this.props.loading && templates.loading()}
                {this.props.error && templates.error(this.props.error)}

                <Form onSubmit={this.props.login} values={this.props.item}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.accountReducers.login.loggedIn,
        error: state.accountReducers.login.error,
        loading: state.accountReducers.login.loading
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
