import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "./Form";
import { create, loading, error } from "../../actions/document/create";


// Import Theme
import { Button, IconButton } from "react-toolbox/lib/button";
import { templates } from "../../shared/helpers/templates";
import { header as Header } from "../../shared/components/header";

// Import Style
import styles from "../../shared/styles/react_overrides.scss";


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
        if (this.props.created)
            return <Redirect to={`edit/${encodeURIComponent(this.props.created['id'])}`}/>;

        return (
            <div>
                <Header>
                    <Link to="."><IconButton className={styles.largeIcon} icon="keyboard_arrow_left" /></Link>
                </Header>

                {this.props.loading && templates.loading()}
                {this.props.error && templates.error(this.props.error)}

                <Form onSubmit={this.props.create} values={this.props.item}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        created: state.documentReducers.create.created,
        error: state.documentReducers.create.error,
        loading: state.documentReducers.create.loading,
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