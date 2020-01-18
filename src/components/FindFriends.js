import React from 'react'
import Navbar from './Navbar'
import { Input } from 'semantic-ui-react'
import { allUsers ,fetchUser, userFollowees} from '../actions/userLogin'
import { connect } from  'react-redux'
import WithAuth from './WithAuth'
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

class FindFriends extends React.Component {

    state = {
        searchTerm: ''
    }
    
    componentDidMount = () => {
        if(this.props.user.currentUser.id){
            this.props.allUsers(this.props.user.currentUser)
            this.props.userFollowees(this.props.user.currentUser)
        }
    }

    componentDidUpdate(prevProps, prevState){

        if(!prevProps.user.currentUser.id && this.props.user.currentUser.id){
            this.props.allUsers(this.props.user.currentUser)
            this.props.userFollowees(this.props.user.currentUser)
        }
    }

    handleSearch = event => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    renderUserPage = user => {
        this.props.fetchUser(user)
    }

    renderUsers = () => {
        const allUsers = this.props.user.users.allUsers.filter(user => user.username.toLowerCase().includes(this.state.searchTerm))
        return allUsers.map((user, index) => {
            return (
                <Grid.Column key={index} >
                <Card onClick={() => this.renderUserPage(user)}>
                    <Image src={user.profile_photo} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{user.username}</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                                <Icon name='user' />
                                {this.props.user.currentUser.followees.find(u => u.username === user.username ) ?
                                'Following ✅' : 'Not Following' }
                </Card.Content>
              </Card>
              </Grid.Column>
            )
        })
    }

    render(){
        return(
            <div>
                <div>
                    < Navbar />
                </div>
                <div>
                    <Input icon='users' iconPosition='left' placeholder='Search users...' onChange={this.handleSearch}/><br></br>
                    <Grid columns={4} padded>
                            {this.renderUsers()}
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        allUsers: (users) => { dispatch(allUsers(users)) },
        fetchUser: user => { dispatch(fetchUser(user))},
        userFollowees: user => { dispatch(userFollowees(user))}
        
    }
}

const mapStateToProps = state => {
    return {
        user: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(FindFriends))