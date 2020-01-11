import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import WithAuth from './WithAuth'
import { Image, List, Input, Grid} from 'semantic-ui-react'
import { fetchUser } from '../actions/userLogin'

class FriendsList extends React.Component {

    state = {
        searchTermFollowees: '',
        searchTermFollowers: ''
    }

    handleSearchFollowees = (event) => {
        this.setState({
          searchTermFollowees: event.target.value
        })
    }

    handleSearchFollowers = (event) => {
        this.setState({
          searchTermFollowers: event.target.value
        })
    }

    renderUserPage = user => {
        this.props.fetchUser(user)
    }


    renderFolowees(){
        const allFollowees = this.props.user.currentUser.followees.filter(followee => followee.username.toLowerCase().includes(this.state.searchTermFollowees))

       return allFollowees.map((follow, index) => {
        return   (
                <List key={index} animated verticalAlign='middle'>
                    <List.Item onClick={() => this.renderUserPage(follow)}>
                        <Image avatar src={follow.profile_pic_url} />
                        <List.Content>
                            <List.Header>{follow.username}</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
                )
       })
    }

    renderFolowers(){
        const allFollowers = this.props.user.currentUser.followers.filter(follower => follower.username.toLowerCase().includes(this.state.searchTermFollowers))

       return allFollowers.map((follow, index) => {
        return   (
                <List key={index} animated verticalAlign='middle'>
                    <List.Item onClick={() => this.renderUserPage(follow)}>
                        <Image avatar src={follow.profile_pic_url} />
                        <List.Content>
                            <List.Header>{follow.username}</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
                )
       })
    }

    render(){

        return(
            <div>
                <div>
                    < Navbar />
                </div>
                <Grid columns={2} padded>
                    <Grid.Column>
                        <h3>Following</h3>
                        <Input icon='users' iconPosition='left' placeholder='Search users...' onChange={this.handleSearchFollowees}/>
                        {this.renderFolowees()}
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Followers</h3>
                        <Input icon='users' iconPosition='left' placeholder='Search users...' onChange={this.handleSearchFollowers}/>
                        {this.renderFolowers()}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: user => {dispatch(fetchUser(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(FriendsList))