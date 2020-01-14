import history from './history'

const addLikeAction = like => {
    console.log(like)
    return {
        type: 'ADD_LIKE',
        like
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
        .then(data => dispatch(addLikeAction(data)))
    }
}