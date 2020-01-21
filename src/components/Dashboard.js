import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { userFollowees, fetchUser, allUsers } from '../actions/userLogin'
import { Image, Divider, Header, Grid, Label, Button, Segment, Input, Form} from 'semantic-ui-react'
import { addLike, unlikePost } from '../actions/likes'
import { fetchPosts } from '../actions/posts'
import { fetchAllTrips, updateTrip} from '../actions/trips'
import { createComment } from '../actions/comments'

class Dashboard extends React.Component {  

  state = {
    searchTerm: '',
    showComments: undefined,
    addComment: undefined,
    commentContent: ''
  }

  componentDidMount(){
    this.props.userFollowees(this.props.user.currentUser)
    this.props.allUsers(this.props.user.currentUser)
    this.props.fetchPosts()
    this.props.fetchAllTrips()
  }

  componentDidUpdate(prevProps, prevState){
    if(!prevProps.user.currentUser.id && this.props.user.currentUser.id){
        this.props.allUsers(this.props.user.currentUser)
        this.props.userFollowees(this.props.user.currentUser)
        this.props.fetchPosts()
        this.props.fetchAllTrips()
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

handleLikeBtn = (userId, postId) => {
  this.props.addLike(userId, postId)
}

handleUnlikeBtn = (userId, postId) => {
  this.props.unlikePost(userId, postId)
}

handleShowComments = (post) => {
  this.setState({
    showComments: post.id
  })
}

handleHideComments = () => {
  this.setState({
    showComments: undefined,
    addComment: undefined
  })
}

handleAddComment = (post) => {
  this.setState({
    addComment: post.id
  })
}

handleChange = event => {
  this.setState({
    commentContent: event.target.value
  })
}

handleSubmit = (userId, comment) => {
  this.props.createComment(userId, comment)
    this.setState({
      addComment: undefined
    })
}

renderComments = (post) => {
  return post.comments.map((comment, index) => {
      let u = this.props.user.currentUser.users.find(user => user.id === comment.user_id)
      return  <div key={index}>
              <Label as='a' image onClick={() => this.renderUserPage(u)}>
              <img src={u.profile_photo} /> 
                {u.username}
              </Label> 
                {comment.content}
                <Divider section />
        </div>
})
} 

  renderPosts = () => {
    const sortedPosts = this.props.user.posts.posts.sort((a, b) => b.id - a.id)
    return sortedPosts.map((post, index) => { 
       const myUser = this.props.user.currentUser.followees.find(user => user.id === post.user_id)
       if(myUser){
        return(
              <div key={index}>
                      <Label key={index} as='a' image onClick={() => this.renderUserPage(myUser)}>
                       <img src={myUser.profile_photo} /> 
                        {myUser.username}
                      </Label> 
                        <Header as='h3'>{post.text}</Header>
                          <Image src={post.post_photo} bordered height='450' width='450'/>
                          {this.props.user.currentUser.liked_posts.find(liked_post => {
                                return post.id === liked_post.id
                            }) ? 
                    <div>
                      <Button size='mini'
                      icon='heart'
                      color='red'
                      name='unlike'
                      onClick={() => this.handleUnlikeBtn(this.props.user.currentUser.id, post.id)}
                      label={{ as: 'a', basic: true, content: post.likes }}
                      labelPosition='right'
                      />
                      <Button size='mini' onClick={() => this.handleShowComments(post)} id={post.id}>Show Comments</Button>
                      <Button size='mini' onClick={() => this.handleAddComment(post)} id={post.id}>Add Comment</Button>
                      <Button size='mini' onClick={this.handleHideComments}> Hide </Button>
                    </div>
                    :
                    <div>
                      <Button
                      icon='heart'
                      name='like'
                      onClick={ () => this.handleLikeBtn(this.props.user.currentUser.id, post.id)}
                      label={{ as: 'a', basic: true, content: post.likes }}
                      labelPosition='right'
                      size='mini'/>
                      <Button size='mini' onClick={() => this.handleShowComments(post)} id={post.id}>Show Comments</Button>
                      <Button size='mini' onClick={() => this.handleAddComment(post)} id={post.id}>Add Comment</Button>
                      <Button size='mini' onClick={this.handleHideComments}> Hide</Button>
                    </div>
                  }
                  <Divider hidden />
                  {this.state.showComments === post.id ?
                      <div>
                        <Segment>
                          {this.renderComments(post)}
                        </Segment>
                        < Divider hidden />
                      </div>
                        :
                        null}
                        {this.state.addComment === post.id ?
                        <div>
                        <Form size='mini' onSubmit={() => this.handleSubmit(this.props.user.currentUser.id, this.state)}>
                          <Form.Field>
                                <input
                                    name='addComment'
                                    placeholder='Add Comment Here...'
                                    onChange={this.handleChange}/>
                            </Form.Field>
                          <Button size='mini' color='green' type='submit'>Submit</Button>
                        </Form><br></br>
                        < Divider hidden />
                        </div>
                        :
                        null}
              </div>
            )}
    })
  }

  handleBookTrip = (trip, renterId) => {
    this.props.updateTrip(trip, renterId)
  }

  renderTrips = () => {
    const allTrips = this.props.user.trips.trips.filter(trip => trip.start_date.includes(this.state.searchTerm))
    return allTrips.map((trip, index) => {
      const myUser = this.props.user.currentUser.followees.find(user => user.id === trip.user_id)
      if(myUser && trip.renter_id === null){
             return( <div key={index}>
                    <Label key={index} as='a' image onClick={() => this.renderUserPage(myUser)}>
                       <img src={myUser.profile_photo} /> 
                        {myUser.username}
                    </Label> <br></br>
                    <p>✈️ Future trip is scheduled for {trip.start_date} until {trip.end_date}!</p>
                    <Button size='mini' color='orange' onClick={() => this.handleBookTrip(trip, this.props.user.currentUser.id)}>Book</Button>
                    <Divider horizontal inverted>
                        -------------------
                    </Divider>
                </div>)}
    })
  }

    render(){
      return (
          <div>
            <div>
              < Navbar />
            </div>
            <div >
            <Grid columns={3}>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column >
                          {this.renderPosts()}
                        </Grid.Column>
                        <Grid.Column >
                        <Input icon='search' iconPosition='left' placeholder='Search by start date...' onChange={this.handleSearch}/>
                          <Segment inverted color='green'>
                            {this.renderTrips()}
                          </Segment>
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
    userFollowees: user => {dispatch(userFollowees(user))},
    fetchUser: user => {dispatch(fetchUser(user))},
    allUsers: user => {dispatch(allUsers(user))},
    addLike: (userId, postId) => {dispatch(addLike(userId, postId))},
    unlikePost: (userId, postId) => {dispatch(unlikePost(userId, postId))},
    fetchPosts: () => {dispatch(fetchPosts())},
    fetchAllTrips: () => {dispatch(fetchAllTrips())},
    updateTrip: (trip, renterId) => {dispatch(updateTrip(trip, renterId))},
    createComment: (userId, comment) => {dispatch(createComment(userId, comment))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))