export default function clearReducer(state = false, action) {
    switch (action.type) {
        case 'SET_CLEAR':
            return state = action.payload;
        default:
            return state;
    }
}
