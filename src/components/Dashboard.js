import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'

class Dashboard extends React.Component {

    render(){

        return (
          <div>
            < Navbar />
          </div>
        )
    }
}

export default WithAuth(Dashboard)