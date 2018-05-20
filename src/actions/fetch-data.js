import requestApi from 'utils/request-api';

import { REQUEST_FIELDS } from 'constants/urls';

export default(url = '') => (dispatch, getState) => {
    dispatch({
        type: 'DATA_LOADING',
    });

    return requestApi(`resources?path=${url}&fields=${REQUEST_FIELDS}`, getState().authToken)
        .then((json) => {
            if (json.error) {
                return dispatch({
                    type: 'DATA_LOADING_FAILURE',
                    payload: json.message,
                });
            }

            const {
                limit,
                offset,
                total,
                items,
                path,
            } = json._embedded;

            return dispatch({
                type: 'DATA_LOADING_SUCCEESS',
                payload: {
                    path: path.substring(5),
                    data: items,
                    metadata: {
                        limit,
                        offset,
                        total,
                    },
                    name: json.name,
                },
            });
        }).catch((error) => dispatch({
            type: 'DATA_LOADING_FAILURE',
            payload: error.message,
        }));
};
