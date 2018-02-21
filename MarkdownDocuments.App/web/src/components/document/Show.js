import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { retrieve, reset } from '../../actions/document/show';
import { del, loading, error } from '../../actions/document/delete';
import { templates } from "../../utils/templates";
import { largeIcon, largeIconDanger, page } from '../../index.css';
import { Button, IconButton } from "react-toolbox/lib/button";
import { Dialog } from "react-toolbox/lib/dialog";

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

        this.setState({showDeleteDialog:false});
    }

    componentWillUnmount() {
        this.props.reset();
    }

    del = () => {
        this.props.del(this.props.retrieved);
    };

    render() {
        if (this.props.deleted) return <Redirect to=".."/>;

        let item = this.props.retrieved;

        const toggleDialog = () => {
            this.setState({showDeleteDialog:!this.state.showDeleteDialog});
        };

        const actions = [
            { label: "No", onClick: toggleDialog },
            { label: "Yes", onClick: () => { toggleDialog(); this.del();} }
        ];

        if (item !== null) item = this.props.retrieved.value;

        return (
            <div>
                <div style={{margin:"0 15px"}}>
                    <Link to=".."><IconButton className={largeIcon} icon="keyboard_arrow_left" /></Link>

                    <div style={{float:"right", padding:"0 15px"}}>
                        {item && <Link to={`/document/edit/${encodeURIComponent(item["id"])}`}><IconButton className={largeIcon} icon="mode_edit" /></Link>}
                        <IconButton onClick={toggleDialog} icon="delete" className={largeIconDanger} />

                        <Dialog actions={actions}
                                active={this.state && this.state.showDeleteDialog}
                                onEscKeyDown={toggleDialog}
                                onOverlayClick={toggleDialog}
                                title='Delete Document'
                                style={{left: "0"}}>
                            <p>Are you sure you want to delete <strong>{item && item["title"]}</strong>, it can not be recovered?</p>
                        </Dialog>
                    </div>
                </div>

                <hr />

                {this.props.loading && templates.loading()}
                {this.props.error && <div>{this.props.error}</div>}
                {this.props.deleteError && <div>{this.props.deleteError}</div>}

                {item &&
                    <div className={page}>
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