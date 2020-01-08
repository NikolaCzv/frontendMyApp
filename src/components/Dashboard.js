import React from 'react'
import WithAuth from './WithAuth'

class Dashboard extends React.Component {
    render(){
        return(
            <div>
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default WithAuth(Dashboard)