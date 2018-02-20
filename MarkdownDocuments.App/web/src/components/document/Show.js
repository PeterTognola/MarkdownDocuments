import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {retrieve, reset} from '../../actions/document/show';
import { del, loading, error } from '../../actions/document/delete';
import {templates} from "../../utils/templates";
import {FontIcon} from "react-toolbox/lib/font_icon/FontIcon";
import { largeIcon } from '../../index.css';

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

        let item = this.props.retrieved;

        if (item !== null) item = this.props.retrieved.value;

        return (
            <div>
                <div className="navigation">
                    <Link to=".."><FontIcon className={largeIcon} value="keyboard_arrow_left" /></Link>
                    {item && <Link to={`/document/edit/${encodeURIComponent(item["id"])}`}><FontIcon className={largeIcon} value="mode_edit" /></Link>}
                    <FontIcon onClick={this.del} value="delete" className={largeIcon} />
                    {/* todo <button onClick={this.del}>Delete</button> */}
                </div>

                {this.props.loading && templates.loading()}
                {this.props.error && <div>{this.props.error}</div>}
                {this.props.deleteError && <div>{this.props.deleteError}</div>}

                {item &&
                    <div className="page">
                        <h1>{item["title"]}</h1>
                        <p>{item["body"]}</p>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.documentReducers.show.error,
        loading: state.documentReducers.show.loading,
        retrieved:state.documentReducers.show.retrieved,
        deleteError: state.documentReducers.del.error,
        deleteLoading: state.documentReducers.del.loading,
        deleted: state.documentReducers.del.deleted
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieve: id => dispatch(retrieve(id)),
        del: item => dispatch(del(item.value)),
        reset: () => {
            dispatch(reset());
            dispatch(error(null));
            dispatch(loading(false));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);