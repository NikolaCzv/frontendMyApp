export default function auth(state = {
    followees: [],
    followers: []
  }, action) {
      switch (action.type) {
        case 'USER_LOGIN':
          return {...action.user}
        case 'SIGN_OUT':
          return state = ''
        default:
          return state
      }
  }