import { Types } from './'

function reducer(state, action) {
    switch (action.type) {
        case Types.LOADING:
            return {
                loading: true,
                data: null,
                error: null
            };
        case Types.SUCCESS:
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case Types.ERROR:
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default reducer;