import requestApi from 'utils/request-api';

import { REQUEST_FIELDS } from 'constants/urls';

export default(path = '/') => (dispatch, getState) => {
    dispatch({
        type: 'DATA_LOADING',
    });

    return requestApi(`resources?path=${path}&fields=${REQUEST_FIELDS}`, getState().authToken)
        .then((json) => {
            const {
                limit,
                offset,
                total,
                items,
                path
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
                },
            });
        }).catch((error) => dispatch({
            type: 'DATA_LOADING_FAILURE',
            payload: error,
        }));
};
