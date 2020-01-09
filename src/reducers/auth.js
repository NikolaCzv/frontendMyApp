export default function auth(state = {
    followees: []
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