import { Types } from './'

function reducer(state, action) {
    switch (action.type) {
        case Types.LOADING:
            return {
                type: Types.LOADING,
                data: null,
                error: null
            };
        case Types.SUCCESS:
            return {
                type: Types.SUCCESS,
                data: action.data,
                error: null
            };
        case Types.ERROR:
            return {
                type: Types.ERROR,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default reducer;