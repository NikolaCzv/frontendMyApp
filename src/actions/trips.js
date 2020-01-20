import history from './history'

const addTrip = trip => {
    return {
        type: "ADD_TRIP",
        trip
    }
}

const allTrips = trips => {
    return {
        type: 'ALL_TRIPS',
        trips
    }
}

export const createTrip = trip => {

    return function(dispatch){

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start_date: trip.startDate,
                end_date: trip.endDate,
                user_id: trip.user_id
            })
        }

        fetch('http://localhost:3000/api/v1/trips', reqObj)
        .then(resp => resp.json())
        .then(data => {
            dispatch(addTrip(data))
            history.push('/myProfile')
        })
    }
}

export const fetchAllTrips = () => {
    return function(dispatch){
    fetch('http://localhost:3000/api/v1/trips')
    .then(resp => resp.json())
    .then(data => dispatch(allTrips(data)))}
}