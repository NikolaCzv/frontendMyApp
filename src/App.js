import React from 'react';
import {Router, Route} from 'react-router-dom'
import login from './components/Login'
import dashboard from './components/Dashboard'
import signUp from './components/SignUp'
import history from './actions/history'
import myProfile from './components/MyProfile'
import friendsList from './components/FriendsList'
import findFriends from './components/FindFriends'
import userShowPage from './components/UserShowPage'
import editProfile from './components/EditProfile'
import addPost from './components/AddPost'
import addTrip from './components/AddTrip'
import homepage from './components/Homepage'
import './App.css'

class App extends React.Component {

  render(){
    return (
      <div >
        < Router history={history}>
            < Route exact path='/' component={homepage} />
            < Route exact path='/login' component={login} />
            < Route exact path='/signup' component={signUp} />
            < Route exact path='/dashboard' component={dashboard} />
            < Route exact path='/myProfile' component={myProfile} />
            < Route exact path='/friendsList' component={friendsList} />
            < Route exact path='/findFriedns' component={findFriends} />
            < Route exact path={`/profile/:id`} component={userShowPage} />
            < Route exact path='/editProfile' component={editProfile} />
            < Route exact path={'/addPost'} component={addPost} />
            < Route exact path='/addTrip' component={addTrip} />
        </Router>
      </div>
    );
  }
}


export default App;
