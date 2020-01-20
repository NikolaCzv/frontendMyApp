const initialState = {
    allTrips: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ALL_TRIPS':
            return {...state, allTrips: action.trips}
        default:
            return state
    }
}