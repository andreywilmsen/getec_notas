const initialState = {
    dataNote: '',
    nfNote: '',
    matriculaNote: '',
    personNote: '',
    cidadeNote: ''
};

export default function notesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PERSON':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}