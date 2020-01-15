const initialState = {
    allUsers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ALL_USERS':
            return {...state, allUsers: action.users}
        default:
            return state
    }
}