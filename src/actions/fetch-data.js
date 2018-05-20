import requestApi from 'utils/request-api';

export default() => (dispatch, getState) =>
    requestApi('resources?pdfath=/', getState().authToken).then((response) =>
        response.json().then((json) => {
            const {
                limit,
                offset,
                total,
                items,
            } = json.embedded;
            console.log('im here');
            return {
                type: 'ROOT_DATA_LOADING_SUCCEESS',
                data: items,
                metadata: {
                    limit,
                    offset,
                    total,
                },
            };
        }, () => ({
            type: 'ROOT_DATA_LOADING_FAIL',
            error: {
                code: 500,
                message: 'Ответ сервера содержит некорректные данные',
            },
        })));
