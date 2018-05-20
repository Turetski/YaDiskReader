import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import queryParse from 'utils/query-parse';

import fetchData from 'actions/fetch-data';

import Loader from './views/loader';
import DataList from './views/data-list';
import Error from './views/error';

class MainPage extends React.Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const { authToken, location } = this.props;

        const path = queryParse(location.search).path || '/';

        if (authToken) {
            this.props.actions.fetchData(path);
        }
    }

    handleClickBack = () => {
        this.props.history.replace({
            pathname: '/',
        });
    }

    render() {
        const {
            authToken,
            isLoaded,
            data,
            error,
            path,
            name
        } = this.props;
        const parentPath = path.replace(`/${name}`, '');
        const needBackBtn = (path !== '/') && !error;

        return (
            <React.Fragment>
                <h1>Просмотр диска</h1>
                {!authToken && (
                    <Error
                        title="Не удалось авторизоваться на Yandex.Disk"
                        btnLabel="Авторизоваться"
                        onBtnClick={this.handleClickBack}
                    />
                )}
                {authToken && !isLoaded && <Loader />}
                {authToken && isLoaded && (
                    <DataList
                        data={data}
                        parentPath={parentPath}
                        needBackBtn={needBackBtn}
                    />
                )}
                {error && (
                    <Error
                        title={error}
                        btnLabel="На главную"
                        onBtnClick={this.handleClickBack}
                    />
                )}
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
    connect(mapStateToProps, mapDispatchToProps),
)(MainPage);
