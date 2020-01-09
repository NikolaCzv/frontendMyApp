import React from 'react'
import WithAuth from './WithAuth'
import { Menu } from 'semantic-ui-react'
import history from '../actions/history'

class Dashboard extends React.Component {

    state = { 
        activeItem: 'dashboard' 
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleSignOut = () => {
        history.push('/login')
    }


    render(){
        const { activeItem } = this.state

        return (
          <Menu inverted color='green' widths={5}>
            <Menu.Item
                name='dashboard'
                active={activeItem === 'dashboard'}
                onClick={this.handleItemClick}
            />
            <Menu.Item
              name='my profile'
              active={activeItem === 'my profile'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='add post'
              active={activeItem === 'add post'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='friends'
              active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='sign out'
              active={activeItem === 'sign out'}
              onClick={this.handleSignOut}
            />
          </Menu>
        )
    }
}

export default WithAuth(Dashboard)