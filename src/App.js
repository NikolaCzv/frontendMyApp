import React from 'react';
import {Router, Route} from 'react-router-dom'
import login from './components/Login'
import dashboard from './components/Dashboard'
import signUp from './components/SignUp'
import history from './actions/history'
import myProfile from './components/MyProfile'
import friendsList from './components/FriendsList'
import findFriends from './components/FindFriends'
import { connect } from 'react-redux'
import userShowPage from './components/UserShowPage'
import editProfile from './components/EditProfile'
import addPost from './components/AddPost'

class App extends React.Component {

  render(){
    return (
      <div >
        < Router history={history}>
            < Route exact path='/' component={login} />
            < Route exact path='/login' component={login} />
            < Route exact path='/signup' component={signUp} />
            < Route exact path='/dashboard' component={dashboard} />
            < Route exact path='/myProfile' component={myProfile} />
            < Route exact path='/friendsList' component={friendsList} />
            < Route exact path='/findFriedns' component={findFriends} />
            < Route exact path={`/profile/:id`} component={userShowPage} />
            < Route exact path='/editProfile' component={editProfile} />
            < Route exact path={'/addPost'} component={addPost} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state
  }
}

export default connect(mapStateToProps)(App);
