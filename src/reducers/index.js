import { combineReducers } from 'redux'
import currentUser from './auth'
import users from './users'
import posts from './posts'
import trips from './trips'

export default combineReducers({
    currentUser,
    users,
    posts,
    trips
})