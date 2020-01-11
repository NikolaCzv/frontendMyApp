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
          return {...state, showUser: action.user.id }
        case 'EDIT_USER':
          let index = state.users.findIndex(user => user.id === action.user.id)
          state.users[index] = action.user
          return { ...state, users: [...state.users]}
        case 'DELETE_NOTE':
          return {...state, users: state.users.filter(user => user.id !== action.user)}
        default:
          return state
      }
  }