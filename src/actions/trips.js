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

const deleteTripAction = trip => {
    return {
        type: 'DELETE_TRIP',
        trip: trip.id
    }
}

const addRenter = trip => {
    return {
        type: 'ADD_RENTER',
        trip
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
            if(data.error){
                alert('Invalid dates! Date structure should be (YYYY/MM/DD)')
            }else {
            dispatch(addTrip(data))
            history.push('/myProfile')}
        })
    }
}

export const fetchAllTrips = () => {
    return function(dispatch){
    fetch('http://localhost:3000/api/v1/trips')
    .then(resp => resp.json())
    .then(data => dispatch(allTrips(data)))}
}

export const deleteTrip = trip => {
    return function(dispatch){
        fetch(`http://localhost:3000/api/v1/trips/${trip.id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => dispatch(deleteTripAction(data)))
    }
}

export const updateTrip = (trip, renterId) => {
    return function(dispatch){
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start_date: trip.start_date,
                end_date: trip.end_date,
                user_id: trip.user_id,
                renter_id: renterId
            })
        }

        fetch(`http://localhost:3000/api/v1/trips/${trip.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => {dispatch(addRenter(data))
            history.push('/myProfile')})
    }
}