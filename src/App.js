import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import login from './components/Login'
import dashboard from './components/Dashboard'


class App extends React.Component {

  render(){
    return (
      <div className="App">
        < Router >
            < Route exact path='/' component={login} />
            < Route exact path='/login' component={login} />
            < Route exact path='/dashboard' component={dashboard} />
        </Router>
      </div>
    );
  }
}

export default App;
