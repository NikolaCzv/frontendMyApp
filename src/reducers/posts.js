const initialState = {
    posts: []
}

export default function (state= initialState, action) {
    switch (action.type) {
        case 'ALL_POSTS':
            return {...state, posts: [...action.posts]}
        case 'DELETE_POST':
            return {...state, posts: state.posts.filter(post => post.id !== action.post)}
        default:
            return state
    }
}