const initialState = {
    path: '',
    data: [],
    metadata: {},
    error: null,
    isLoaded: false,
    name: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'DATA_LOADING':
        return initialState;

    case 'DATA_LOADING_SUCCEESS':
        return {
            ...action.payload,
            error: null,
            isLoaded: true,
        };

    case 'DATA_LOADING_FAILURE':
        return {
            ...initialState,
            error: action.payload,
            isLoaded: true,
        };

    default:
        return state;
    }
};
