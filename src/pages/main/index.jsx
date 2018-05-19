import * as React from 'react';
import { Button } from 'react-bootstrap';
import get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import generateDeviceId from 'utils/generate-device-id';

import saveToken from 'actions/save-token';

import { YA_OAUTH, CALLBACK_URL } from 'constants/urls';
import { APP_ID } from 'constants/app_id';

class MainPage extends React.Component {
    componentDidMount() {
        const token = get(/access_token=([^&]+)/.exec(document.location.hash), '[1]');

        if (token) {
            this.props.actions.saveToken(token);

            this.props.history.replace({
                pathname: '/disk',
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(2222, nextProps.authToken);
    }

    handleClickConnect = () => {
        const deviceId = generateDeviceId();
        const url = `${YA_OAUTH}&client_id=${APP_ID}&deviceId=${deviceId}&redirect_uri=${CALLBACK_URL}`;

        window.location.replace(url);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Главная страница</h1>
                <Button bsStyle="primary" onClick={this.handleClickConnect}>
                    Подключиться к Yandex Disk
                </Button>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    authToken: state.authToken,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        saveToken,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
