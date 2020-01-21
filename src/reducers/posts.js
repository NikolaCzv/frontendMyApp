const initialState = {
    posts: []
}

export default function (state= initialState, action) {
    switch (action.type) {
        case 'ALL_POSTS':
            return {...state, posts: [...action.posts]}
        case 'DELETE_POST':
            return {...state, posts: state.posts.filter(post => post.id !== action.post)}
        case 'ADD_COMMENT':
            const myPost = state.posts.find(post => post.id === action.comment.post_id)
            myPost.comments = [...myPost.comments, action.comment]
            return {...state}
        case 'ADD_LIKE':
            const thePost = state.posts.find(post => post.id === action.like.post_id)
            thePost.likes ++
            return {...state}
        case 'UNLIKE':
            const newPost = state.posts.find(post => post.id === action.postId)
            newPost.likes --
                return{...state}
        default:
            return state
    }
}