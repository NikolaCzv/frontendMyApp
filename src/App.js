import React from 'react';
import {Router, Route} from 'react-router-dom'
import login from './components/Login'
import dashboard from './components/Dashboard'
import signUp from './components/SignUp'
import history from './actions/history'
import myProfile from './components/MyProfile'


class App extends React.Component {

  render(){
    return (
      <div className="App">
        < Router history={history}>
            < Route exact path='/' component={login} />
            < Route exact path='/login' component={login} />
            < Route exact path='/dashboard' component={dashboard} />
            < Route exact path='/signup' component={signUp} />
            < Route exact path='/myProfile' component={myProfile} />
        </Router>
      </div>
    );
  }
}

export default App;
