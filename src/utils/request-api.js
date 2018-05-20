import set from 'lodash/set';
import 'fetch-polyfill';

import { YA_API } from 'constants/urls';

export default async (url, authToken) => {
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

    const response = await fetch(`${YA_API}${url}`, options);

    const payload = await response.json();

    return payload;
};
