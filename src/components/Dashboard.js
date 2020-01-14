import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { userFollowees, fetchUser, allUsers } from '../actions/userLogin'
import { Image, Divider, Header, Grid, Label, Button} from 'semantic-ui-react'
import { addLike } from '../actions/likes'

class Dashboard extends React.Component {  

  componentDidMount(){
    this.props.userFollowees(this.props.user.currentUser)
    this.props.allUsers(this.props.user.currentUser)
  }

  componentDidUpdate(prevProps, prevState){
    console.log(!prevProps.user.currentUser.id)
    console.log(this.props.user.currentUser.id)

    if(!prevProps.user.currentUser.id && this.props.user.currentUser.id){
        this.props.allUsers(this.props.user.currentUser)
        this.props.userFollowees(this.props.user.currentUser)
    }
}

renderUserPage = user => {
  this.props.fetchUser(user)
}

handleLikeBtn = (userId, postId) => {
  this.props.addLike(userId, postId)
}

  renderFolloweesPosts = () => {
    return this.props.user.currentUser.followees.map((user, index) => {
      return (
        <div key={index}>
          <Label as='a' image onClick={() => this.renderUserPage(user)}>
            <img src={user.profile_pic_url} /> 
            {user.username}
          </Label>
          {this.renderPosts(user.posts)}
          <Divider hidden />
        </div>
      )
    })
  }

  renderPosts = posts => {
    return posts.map((post, index) => {
      const isLiked = this.props.user.currentUser.liked_posts.find(liked_post => {
        return post.id === liked_post.id
      })
      return(  
        <div key={index}>
          <Header as='h3'>{post.text}</Header>
            <Image src={post.pic_url} size='big' /> {post.likes}
            <Button disabled={isLiked} onClick={ () => this.handleLikeBtn(this.props.user.currentUser.id, post.id)}> Like </Button>
            <Divider hidden />
        </div>
      )
    })
  }

    render(){
      console.log(this.props.user.currentUser)
        return (
          <div>
            <div>
              < Navbar />
            </div>
            <div>
            <Grid columns={3}>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column >
                          {this.renderFolloweesPosts()}
                        </Grid.Column>
                        <Grid.Column >
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
    addLike: (userId, postId) => {dispatch(addLike(userId, postId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))