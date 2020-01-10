const initialState = {
  followees: [],
  followers: [],
  users: [],
  showUser: undefined
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
          console.log(action)
            return {...state, showUser: action.user.id }
        default:
          return state
      }
  }