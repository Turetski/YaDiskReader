import set from 'lodash/set';
import 'fetch-polyfill';

import { YA_API } from 'constants/urls';

export default (url, authToken) => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    if (authToken) {
        set(options, 'headers.Authorization', authToken);
    }

    return fetch(`${YA_API}${url}`, options);
};
