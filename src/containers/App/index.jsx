import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Main from 'pages/main';
import NotFound from 'pages/404';
import Disk from 'pages/disk';

import styles from './styles.less'; // eslint-disable-line no-unused-vars


class App extends React.Component<Object> {
    componentDidMount() {
        console.log('I`ve mounted'); // eslint-disable-line no-console
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

export default withRouter(connect()(App));
