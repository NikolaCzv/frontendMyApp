const initialState = {
  posts: [], 
  followees: [],
  followers: [],
  users: [],
  showUser: undefined,
  liked_posts: [],
  commented_posts: []
}

export default function auth(state = initialState, action) {
      switch (action.type) {
        case 'USER_LOGIN':
          return {...state, ...action.user}
        case 'ALL_USERS':
          return {...state, users: action.users}
        case 'SIGN_OUT':
          return initialState
        case 'SHOW_USER_PAGE':
          return {...state, showUser: action.user.id }
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
          if(state.id !== action.like.user_id){
            return {...state, liked_posts: [...state.liked_posts, action.like]}}
        default:
          return state
      }
  }