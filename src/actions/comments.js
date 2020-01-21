import history from './history'

const addComment = comment => {
    return {
        type: 'ADD_COMMENT',
        comment
    }
}

export const createComment = (userId, comment) => {
    return function(dispatch){
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                post_id: comment.addComment,
                content: comment.commentContent
            })
        }

        fetch('http://localhost:3000/api/v1/comments', reqObj)
        .then(resp => resp.json())
        .then(data => {
            dispatch(addComment(data))
            history.push('/dashboard')
        })
    }
}