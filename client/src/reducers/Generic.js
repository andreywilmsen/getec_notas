export default function showNoteFieldsReducer(state = false, action) {
    switch (action.type) {
        case 'SET_SHOWNOTEFIELD':
            return !state;
        default:
            return state;
    }
}