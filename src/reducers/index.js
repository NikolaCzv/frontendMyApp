import { combineReducers } from 'redux'
import currentUser from './auth'
import users from './users'
import followees from './followees'

export default combineReducers({
    currentUser,
    users,
    followees
})