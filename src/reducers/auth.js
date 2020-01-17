const initialState = {
  posts: [], 
  followees: [],
  followers: [],
  showUser: {},
  liked_posts: [],
  commented_posts: []
}

export default function auth(state = initialState, action) {
      switch (action.type) {
        case 'USER_LOGIN':
          console.log(action)
          return {...state, ...action.user}
        case 'SIGN_OUT':
            return initialState
        case 'ALL_USERS':
          return {...state, users: action.users}
        case 'SHOW_USER_PAGE':
          return {...state, showUser: action.user }
        case 'EDIT_USER':
          let index = state.users.findIndex(user => user.id === action.user.id)
          state.users[index] = action.user
          return { ...state, user: [...state.users]}
        case 'DELETE_USER':
          return {...state, users: state.users.filter(user => user.id !== action.user)}
        case 'ADD_FOLLOWER':
          if(!state.followees.find(user => user.id === action.follow.followee_id)){
          let addFollowee = state.users.find(user => user.id === action.follow.followee_id) 
          return {...state, followees: [...state.followees, addFollowee]}}
        case 'UNFOLLOW': 
          return {...state, followees: state.followees.filter(f => f.id !== action.followeeId)}
        case 'USER_FOLLOWEES': 
          return {...state, followees: [...action.followees]}
        case 'ADD_LIKE':
          function order(posts){
            return posts.find(post => {
             return post.id === action.like.post_id
            })
          }
          const searchedUser = state.followees.map(user => order(user.posts))
          const likedPost = searchedUser.find(user => user)
            return {...state, liked_posts: [...state.liked_posts, likedPost]}
        case 'UNLIKE':
          return{...state, liked_posts: state.liked_posts.filter(post => post.id !== action.postId)}
        case 'ADD_POST':
          // return{...state}
          console.log('state', state)
          console.log('action', action)
          return {...state, posts: [...state.posts, action.post]}
        default:
          return state
      }
  }