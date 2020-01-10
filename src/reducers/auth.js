export default function auth(state = {
    followees: [],
    followers: [],
    users: []
  }, action) {
      switch (action.type) {
        case 'USER_LOGIN':
          return {...state, ...action.user}
        case 'ALL_USERS':
          return {...state, users: action.users}
        case 'SIGN_OUT':
          return state = ''
        default:
          return state
      }
  }