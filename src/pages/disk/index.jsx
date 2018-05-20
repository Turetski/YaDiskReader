import * as React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import fetchData from 'actions/fetch-data';

import Loader from './views/loader';
import DataList from './views/data-list';
import styles from './styles.less'; // eslint-disable-line no-unused-vars

class MainPage extends React.Component {
    componentDidMount() {
        const { authToken } = this.props;

        if (authToken) {
            this.props.actions.fetchData();
        }
    }

    handleClickAuthorization = () => {
        this.props.history.replace({
            pathname: '/',
        });
    }

    render() {
        const { authToken, isLoaded, data } = this.props;

        return (
            <React.Fragment>
                <h1>Просмотр диска</h1>
                {!authToken && (
                    <Alert bsStyle="danger">
                        Не удалось авторизоваться на Yandex.Disk
                        <Button
                            bsStyle="danger"
                            className="btn-auth"
                            onClick={this.handleClickAuthorization}
                        >
                            Авторизоваться
                        </Button>
                    </Alert>
                )}
                {authToken && !isLoaded && <Loader />}
                {authToken && isLoaded && <DataList data={data} />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    authToken: state.authToken,
    ...state.diskData,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        fetchData,
    }, dispatch),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MainPage);
