import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
    if (module.hot) {
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers'); // eslint-disable-line global-require

            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
