import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { Grid, Image, Card, Icon, Menu, Header, Button, Segment, Divider} from 'semantic-ui-react'
import WithAuth from './WithAuth'
import { deletePost } from '../actions/posts'

class MyProfile extends React.Component{

    state = { 
        editBtn: false,
        editTripsBtn: false
    }

    editProfile = () => {
        this.props.history.push('/editProfile')
    }

    editPosts = () => {
        this.setState({
            editBtn: !this.state.editBtn
        })
    }

    editTrips = () => {
        this.setState({editTripsBtn: !this.state.editTripsBtn})
    }

    handleDelete = post => {
        this.props.deletePost(post)
    }

    addTripBtn = () => {
        this.props.history.push('/addTrip')
    }

    renderPosts = () => {
        return this.props.user.currentUser.posts.map((post, index) => {
               return <Image height='300' width='300'
                            key={index} src={post.post_photo} 
                            bordered
                            id={post.id}/>
        })
    }

    renderPostsDelete = () => {
        return this.props.user.currentUser.posts.map((post, index) => {
            return <Grid.Column>
                        <Image height='250' width='250'
                            key={index} src={post.post_photo} 
                            bordered
                            id={post.id}/>
                        <Button color='orange' onClick={() => this.handleDelete(post)}>Delete</Button>
                    </Grid.Column>
     })
    }

    renderTrips = () => {
       return this.props.user.currentUser.trips.map((trip, index) => {
            return <div key={index}>
                        <p>✈️ Your have trip scheduled for {trip.start_date} until {trip.end_date}!</p>
                        <Divider horizontal inverted>
                            -------------------
                        </Divider>
                    </div>
        })
    }

    renderEditTrips = () => {
        return this.props.user.currentUser.trips.map((trip, index) => {
            return <div key={index}>
                        <p>✈️ Your have trip scheduled for {trip.start_date} until {trip.end_date}!</p>
                        <Button size='mini' color='red'>Delete</Button> <Button size='mini' color='orange'>Edit</Button>
                        <Divider horizontal inverted>
                            -------------------
                        </Divider>
                    </div>
        })
    }


    render(){
        return(
            <div>
                <div>
                    < Navbar />
                </div>
                <div>
                    <Grid>
                        <Grid.Column width={3}>
                            <Card>
                                <Image src={this.props.user.currentUser.profile_photo} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{this.props.user.currentUser.username}</Card.Header>
                                    <Card.Description>
                                        Contact: {this.props.user.currentUser.email}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra> 
                                    <a href='/friendsList'>
                                        <Icon name='user' />
                                            {this.props.user.currentUser.followers.length} Followers
                                    </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={9}>
                        <Header as='h3'>My Posts</Header>
                        <Header as='h3'></Header>

                            <Grid relaxed='very' columns={3}>
                                        {this.state.editBtn ?
                                            this.renderPostsDelete()
                                        :
                                        <Image.Group columns={3} >
                                            {this.renderPosts()}
                                        </Image.Group>}
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Menu secondary vertical>
                                <Menu.Item
                                name='edit profile'
                                onClick={this.editProfile}
                                />
                                <Menu.Item
                                name='edit posts'
                                onClick={this.editPosts}/>
                                <Menu.Item
                                name='edit trips'
                                onClick={this.editTrips}/>
                            </Menu>
                            {this.state.editTripsBtn ?
                            <Segment inverted color='green'>
                                <Button size='mini'
                                onClick={this.addTripBtn}> Add Trip </Button><br></br>
                                <Header>My Trips</Header>
                                <Divider inverted />
                                {this.renderEditTrips()}
                                </Segment>
                                :
                                <Segment inverted color='green'>
                                <Header>My Trips </Header>
                                <Divider inverted />
                                    {this.renderTrips()}
                                </Segment>
                                }
                        </Grid.Column>
                    </Grid>
                </div>
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
        deletePost: (post) => {dispatch(deletePost(post))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(MyProfile))