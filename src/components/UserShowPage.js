import React from 'react'
import Navbar from './Navbar'
import { Grid, Image, Card, Icon, Menu, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import WithAuth from './WithAuth'
import { addFollower, unfollowUser } from '../actions/follow'

class UserShowPage extends React.Component {

    state = {
        presentUser: this.props.user.currentUser.users.find( user => user.id === this.props.user.currentUser.showUser)
    }

    handleFollowBtn = (userId, followeeId) => {
        this.props.addFollower(userId, followeeId)
    }

    handleUnfollowBtn = (followeeId, followerId) => {
        this.props.unfollowUser(followeeId, followerId)
    }

    renderPosts = () => {
        return this.state.presentUser.posts.map((post, index) => {
            return <Card key={index} image={post.pic_url} />
        })
    }

    render(){
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Grid>
                        <Grid.Column width={4}>
                            <Card>
                                <Image src={this.state.presentUser.profile_pic_url}  wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{this.state.presentUser.username}</Card.Header>
                                            <Card.Description>
                                                Contact: {this.state.presentUser.email}
                                            </Card.Description>
                                    </Card.Content>
                                     <Card.Content extra>
                                            <Icon name='user' />
                                            {this.props.user.currentUser.followees.find(u => u.username === this.state.presentUser.username ) ?
                                                'Following ✅' : 'Not Following' }
                                    </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={9}>
                        <Header as='h3'> Posts </Header>
                        <Header as='h3'></Header>
                                <Grid relaxed='very' columns={3}>
                                        <Card.Group itemsPerRow={3}>
                                            {this.renderPosts()}
                                        </Card.Group>
                                </Grid>
                        </Grid.Column>
                            <Grid.Column width={3}>
                                <Menu secondary vertical>
                                    {this.props.user.currentUser.followees.find(u => u.username === this.state.presentUser.username) ? 
                                    <Menu.Item
                                        name='unfollow'
                                        onClick={() => this.handleUnfollowBtn(this.state.presentUser.id, this.props.user.currentUser.id)}
                                        />
                                    :
                                    <Menu.Item
                                    name='follow'
                                    onClick={() => {
                                        this.handleFollowBtn(this.props.user.currentUser.id, this.state.presentUser.id)}}
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
        unfollowUser: (followeeId, followerId)=> {dispatch(unfollowUser(followeeId, followerId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(UserShowPage))