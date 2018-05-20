import { combineReducers } from 'redux';

import authToken from './auth-token';
import diskData from './disk-data';

export default combineReducers({
    authToken,
    diskData,
});
