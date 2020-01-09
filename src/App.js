import React from 'react';
import {Router, Route} from 'react-router-dom'
import login from './components/Login'
import dashboard from './components/Dashboard'
import signUp from './components/SignUp'
import history from './actions/history'
import myProfile from './components/MyProfile'
import friendsList from './components/FriendsList'


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
        </Router>
      </div>
    );
  }
}

export default App;
