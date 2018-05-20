import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { LocalStorage } from 'utils/user-storage';

import saveToken from 'actions/save-token';

import Main from 'pages/main';
import NotFound from 'pages/404';
import Disk from 'pages/disk';

import styles from './styles.less'; // eslint-disable-line no-unused-vars


class App extends React.Component<Object> {
    constructor(props) {
        super();

        const authToken = LocalStorage.getItem('token');

        if (authToken) {
            props.actions.saveToken(authToken);
        }
    }

    render() {
        return (
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/404" component={NotFound} />
                    <Route path="/disk" component={Disk} />
                    <Redirect from="*" to="/404" />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        saveToken,
    }, dispatch),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
