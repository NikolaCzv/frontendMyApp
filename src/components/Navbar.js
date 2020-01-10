import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import history from '../actions/history'
import { signout } from '../actions/userLogin'
import { connect } from 'react-redux'

class Navbar extends React.Component {
    state = { 
        activeItem: '' 
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    handleSignOut = () => {
        this.props.signout()
        history.push('/login')
        localStorage.clear()
    }

    handleMyProfile = (e, { name }) => {
        history.push('/myProfile')
    }

    handleDashboardClick = (e, { name }) => {
        history.push('/dashboard')
    }

    handleFriendButton = (e, {name}) => {
        history.push('/friendsList')
    }

    handleFindFriendButton = (e, {name}) => {
        history.push('/findFriedns')
    }


    render(){
        const { activeItem } = this.state

        return (
          <Menu inverted color='green'>
            <Menu.Item
                name='dashboard'
                active={activeItem === 'dashboard'}
                onClick={this.handleDashboardClick}
            />
            <Menu.Item
              name='myProfile'
              active={activeItem === 'myProfile'}
              onClick={this.handleMyProfile}
            />
            <Menu.Item
              name='add post'
              active={activeItem === 'add post'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='friends'
              active={activeItem === 'friends'}
              onClick={this.handleFriendButton}
            />
            <Menu.Item
              name='find friends'
              active={activeItem === 'find friends'}
              onClick={this.handleFindFriendButton}
            />
            <Menu.Menu position='right'>
                <Button color='orange'
                     onClick={this.handleSignOut}
                    >Sign Out</Button>
            </Menu.Menu>
          </Menu>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        signout: user => {dispatch(signout(user))}
    }
}

export default connect(null, mapDispatchToProps)(Navbar)