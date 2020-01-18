import React from 'react'
import Navbar from './Navbar'
import { Grid, Image, Card, Icon, Menu, Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import WithAuth from './WithAuth'
import { addFollower, unfollowUser,  } from '../actions/follow'
import { showUserPage, userFollowees  } from '../actions/userLogin'

class UserShowPage extends React.Component {
    constructor(){
        super()
        this.state = {loading: true}
    }

    componentDidMount(){
        if (!this.props.user.currentUser.id) {
            this.props.showUserPage(this.props.match.params.id)
            this.props.userFollowees(this.props.user.currentUser)
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.user.currentUser.showUser.id && prevState.loading){
            this.setState({
                loading: false
            })
        }

        if(!prevProps.user.currentUser.id && this.props.user.currentUser.id){
            this.props.showUserPage(this.props.match.params.id)
            this.props.userFollowees(this.props.user.currentUser)
        }
    }

    handleFollowBtn = (userId, followeeId) => {
        this.props.addFollower(userId, followeeId)
    }

    handleUnfollowBtn = (followeeId, followerId) => {
        this.props.unfollowUser(followeeId, followerId)
    }

    renderPosts = () => {
        return this.props.user.currentUser.showUser.posts.map((post, index) => {
            return <Image height='300' width='300' key={index} src={post.post_photo} bordered/>
        })
    }

    render(){
        if (this.state.loading){
            return     <Segment>
                            <Dimmer active inverted>
                            <Loader size='medium'>Loading</Loader>
                        </Dimmer>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        }
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Grid>
                        <Grid.Column width={4}>
                            <Card>
                                <Image src={ this.props.user.currentUser.showUser.profile_photo}  wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{ this.props.user.currentUser.showUser.username}</Card.Header>
                                            <Card.Description>
                                                Contact: { this.props.user.currentUser.showUser.email}
                                            </Card.Description>
                                    </Card.Content>
                                     <Card.Content extra>
                                            <Icon name='user' />
                                            {this.props.user.currentUser.followees.find(u => u.username ===  this.props.user.currentUser.showUser.username ) ?
                                                'Following ✅' : 'Not Following' }
                                    </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={9}>
                        <Header as='h3'> Posts </Header>
                        <Header as='h3'></Header>
                        <Grid relaxed='very' columns={3}>
                                    <Image.Group columns={3} >
                                        {this.renderPosts()}
                                    </Image.Group>
                            </Grid>
                        </Grid.Column>
                            <Grid.Column width={3}>
                                <Menu secondary vertical>
                                    {this.props.user.currentUser.followees.find(u => u.username ===  this.props.user.currentUser.showUser.username) ? 
                                    <Menu.Item
                                        name='unfollow'
                                        onClick={() => this.handleUnfollowBtn( this.props.user.currentUser.showUser.id, this.props.user.currentUser.id)}
                                        />
                                    :
                                    <Menu.Item
                                    name='follow'
                                    onClick={() => {
                                        this.handleFollowBtn(this.props.user.currentUser.id,  this.props.user.currentUser.showUser.id)}}
                                    />

                                    }
                                </Menu>
                            </Grid.Column>
                </Grid>
            </div>
         </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addFollower: (userId, followeeId) => {dispatch(addFollower(userId, followeeId))},
        unfollowUser: (followeeId, followerId)=> {dispatch(unfollowUser(followeeId, followerId))},
        showUserPage: (userId)=> {dispatch(showUserPage(userId))},
        userFollowees: (user) => {dispatch(userFollowees(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(UserShowPage))