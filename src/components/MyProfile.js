import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { Grid, Image, Card, Icon, Menu, Header, Button, Segment, Divider, Label} from 'semantic-ui-react'
import WithAuth from './WithAuth'
import { deletePost } from '../actions/posts'
import { deleteTrip } from '../actions/trips'
import {allUsers, fetchUser} from '../actions/userLogin'


class MyProfile extends React.Component{

    state = { 
        editBtn: false,
        editTripsBtn: false,
        clicked: undefined
    }

    componentDidMount = () => {
        if(this.props.user.currentUser.id){
            this.props.allUsers(this.props.user.currentUser)
        }
    }

    componentDidUpdate(prevProps, prevState){

        if(!prevProps.user.currentUser.id && this.props.user.currentUser.id){
            this.props.allUsers(this.props.user.currentUser)
        }
    }

    renderUserPage = user => {
        this.props.fetchUser(user)
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

    handleDeletePost = post => {
        this.props.deletePost(post)
    }

    handleDeleteTrip = trip => {
        this.props.deleteTrip(trip)
    }

    addTripBtn = () => {
        this.props.history.push('/addTrip')
    }

    handleImage = (event) => {
        this.setState({
            clicked: event.target.id
        })
    }

    handleHide = () => {
        this.setState({
            clicked: undefined
        })
    }

    renderPosts = () => {
        return this.props.user.currentUser.posts.map((post, index) => {
               return <Image height='300' width='300'
                            key={index} src={post.post_photo} 
                            bordered
                            id={post.id}
                            onClick={this.handleImage}/>
        })
    }

    renderPostsDelete = () => {
        return this.props.user.currentUser.posts.map((post, index) => {
            return <Grid.Column>
                        <Image height='250' width='250'
                            key={index} src={post.post_photo} 
                            bordered
                            id={post.id}/>
                            <Button animated='vertical' color='red' onClick={() => this.handleDeletePost(post)}>
                                <Button.Content hidden>Delete</Button.Content>
                                <Button.Content visible>
                                    <Icon name='trash alternate' />
                                </Button.Content>
                            </Button>
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
                        <Button size='mini' color='red' onClick={() => this.handleDeleteTrip(trip)}>Delete</Button>
                        <Divider horizontal inverted>
                            -------------------
                        </Divider>
                    </div>
        })
    }

    renderBookedTrips = () => {
        return this.props.user.currentUser.booked_trips.map((trip, index) => {
             return <div key={index}>
        <p>✈️ Your have trip scheduled for {trip.start_date} until {trip.end_date}! </p>
                         <Divider horizontal inverted>
                             -------------------
                         </Divider>
                     </div>
         })
     }

     showComments = (post) => {
        return post.comments.map(comment => {
            const userCommented = this.props.user.users.allUsers.find(user => user.id === comment.user_id)
            return <div>
                       <Divider hidden/> 
                       <Label as='a' image onClick={() => this.renderUserPage(userCommented)}>
                            <img src={userCommented.profile_photo} /> 
                            {userCommented.username}
                        </Label>
                        <Divider hidden/>
                          {comment.content}
                       <Divider/>
                   </div>
        })
     }


     showClickedImage = () => {
         const clickedPost = this.props.user.currentUser.posts.find(post => post.id === parseInt(this.state.clicked))
         return <div>
                    <Image height='650' width='925'
                        src={clickedPost.post_photo} 
                        id={clickedPost.id}
                        bordered
                        />
                    <Divider hidden/>
                    <Button size='mini'
                      icon='heart'
                      color='red'
                      name='unlike'
                      label={{ as: 'a', basic: true, content: clickedPost.likes }}
                      labelPosition='right'
                      />
                    <Button size='mini' color='red' onClick={() => this.handleDeletePost(clickedPost)}>Delete</Button>
                    <Button onClick={this.handleHide} size='mini'> Hide </Button>
                    <Divider></Divider>
                    <h4>Comments</h4>
                    {this.showComments(clickedPost)}
                </div>
     }


    render(){
        console.log(this.state.clicked)
        return(
            <div>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <Grid>
                        <Grid.Column width={3}>
                            <Card>
                                <Image src={this.props.user.currentUser.profile_photo} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{this.props.user.currentUser.username}</Card.Header>
                                    <Card.Description>
                                        Contact: {this.props.user.currentUser.email} <br></br>
                                        Home-Town: {this.props.user.currentUser.hometown}
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
                        {this.state.clicked ?
                        <div>
                            {this.showClickedImage()}     
                        </div> : <div>
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
                                </div>
                        
                        }
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
                                <Header as='h4'>My Trips </Header>
                                <Divider inverted />
                                    {this.renderTrips()}
                                </Segment>
                                }
                                <Segment inverted color='green' >
                                    <Header as='h4'>App Booked Trips</Header>
                                    <Divider inverted />
                                    {this.renderBookedTrips()}
                                </Segment>
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
        deletePost: (post) => {dispatch(deletePost(post))},
        deleteTrip: (trip) => {dispatch(deleteTrip(trip))},
        allUsers: (user) => {dispatch(allUsers(user))},
        fetchUser: user => {dispatch(fetchUser(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(MyProfile))