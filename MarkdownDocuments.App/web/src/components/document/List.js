import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/document/list';
import { success } from '../../actions/document/delete';
import { templates } from "../../utils/templates";
import Markdown from "react-markdown";

// Import Theme
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

// Import Style
import styles from '../../index.css';
import { Snackbar } from "react-toolbox/lib/snackbar";

class List extends Component {
    state = {
        documentIndex: 1
    };

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

    handleDocumentTabChange = (documentIndex) => {
        this.setState({documentIndex});
    };

    createCard(item) {
        return (
            <Card key={item.id} style={{margin:"15px auto", maxWidth:"500px"}}>
                <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title={item.title}
                    subtitle="Created on " />
                <CardText style={{color: "#545454"}}>
                    <Markdown>
                        {item.body.length > 320 ? item.body.substring(0, 320) + "..." : item.body}
                    </Markdown>
                </CardText>
                <CardActions>
                    <Link to={`/document/show/${encodeURIComponent(item.id)}`}>
                        <Button label="Open" />
                    </Link>
                    <Button label="Share" />
                </CardActions>
            </Card>
        );
    }

    render() {
        return (
            <div>
                <Snackbar
                    active={this.props.deletedItem !== null}
                    timeout={2500}
                    label={"Document has '" + (this.props.deletedItem && this.props.deletedItem['title']) + "' been deleted."} />

                <div className={styles.floatingButton}>
                    <Link to="/document/create"><Button icon='add' floating accent mini /></Link>
                </div>

                {this.props.loading && templates.loading()}
                {/*{this.props.error && <div className="alert alert-danger">{this.props.error}</div>} todo error reporting */}

                <Tabs index={this.state.documentIndex} onChange={this.handleDocumentTabChange} fixed>
                    <Tab label="All Documents">
                        {this.props.data.value && this.props.data.value.map(this.createCard)}
                    </Tab>

                    <Tab label="My Documents">
                        {this.props.data.value && this.props.data.value.map(this.createCard)}
                    </Tab>

                    <Tab label="Joined Documents">
                        <small style={{textAlign:"center"}}>Nothing Here :(</small>
                    </Tab>
                </Tabs>

                {this.pagination()}
            </div>
        );
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
        deletedItem: state.documentReducers.del.deleted
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        list: (page) => dispatch(list(page)),
        reset: () => {
            dispatch(reset());
            dispatch(success(null));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
