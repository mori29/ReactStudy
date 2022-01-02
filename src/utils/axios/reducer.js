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
        case Types.ERROR:
            return {
                type: action.type,
                data: action.data,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default reducer;