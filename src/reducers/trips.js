const initialState = {
    trips: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ALL_TRIPS':
            return {...state, trips: [...action.trips]}
        case 'DELETE_TRIP': 
            return {...state, trips: state.trips.filter(trip => trip.id !== action.trip)}
        default:
            return state
    }
}