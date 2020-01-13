import history from './history'

const follower = follow => {
    return {
        type: 'ADD_FOLLOWER',
        follow
    }
}

const unfollow = followeeId => {
    return {
        type: 'UNFOLLOW',
        followeeId
    }
}


export const addFollower = (userId, followeeId) => {
    return function(dispatch){

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followee_id: followeeId,
                follower_id: userId
            })
        }

        fetch('http://localhost:3000/api/v1/follows', reqObj)
        .then(resp => resp.json())
        .then(data => {
            dispatch(follower(data))
            history.push(`/profile/${followeeId}`)
        })
    }
}

export const  unfollowUser = (followeeId, followerId) => {

    return function(dispatch){

        fetch(`http://localhost:3000/api/v1/follows/${followeeId}/${followerId}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {dispatch(unfollow(followeeId))
        console.log(data)})
        history.push('/friendsList')
    }
}