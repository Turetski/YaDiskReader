import * as React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import styles from './styles.less'; // eslint-disable-line no-unused-vars

class MainPage extends React.Component {
    handleClickAuthorization = () => {
        this.props.history.replace({
            pathname: '/',
        });
    }

    render() {
        const { authToken } = this.props;

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
                {authToken && (
                    <span>Удалось авторизоваться на Yandex.Disk</span>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    authToken: state.authToken,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
    }, dispatch),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MainPage);
