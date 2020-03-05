import history from './history'

const addLikeAction = like => {
    return {
        type: 'ADD_LIKE',
        like
    }
}

const unlike= postId => {
    return {
        type: 'UNLIKE',
        postId
    }
}



export const addLike = (userId, postId) => {
   return function(dispatch){

    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            post_id: postId
        })
    }

        fetch('http://localhost:3000/api/v1/likes', reqObj)
        .then(resp => resp.json())
        .then(data => {
            dispatch(addLikeAction(data))
            history.push('/dashboard')}
        )
    }
}

export const  unlikePost = (userId, postId) => {

    return function(dispatch){

        fetch(`http://localhost:3000/api/v1/likes/${userId}/${postId}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
        dispatch(unlike(postId))
        console.log(data)
        history.push('/dashboard')})
    }
}