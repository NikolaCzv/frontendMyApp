import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { userFollowees, fetchUser, allUsers } from '../actions/userLogin'
import { Image, Divider, Header, Grid, Label, Button} from 'semantic-ui-react'
import { addLike, unlikePost } from '../actions/likes'

class Dashboard extends React.Component {  

  componentDidMount(){
    this.props.userFollowees(this.props.user.currentUser)
    this.props.allUsers(this.props.user.currentUser)
  }

  componentDidUpdate(prevProps, prevState){
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

handleUnlikeBtn = (userId, postId) => {
  this.props.unlikePost(userId, postId)
}

  renderFolloweesPosts = () => {
  

    // create a new array that is each followees posts 
    // renderPosts with argument being thenew array 
    return this.props.user.currentUser.followees.map((user, index) => {
      return (
        <div key={index}>
          <Label as='a' image onClick={() => this.renderUserPage(user)}>
            <img src={user.profile_photo} /> 
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
      console.log(this.props.user.currentUser.liked_posts.map(post => post.id))
      console.log(post.id)

      return(  
        <div key={index}>
          <Header as='h3'>{post.text}</Header>
            <Image src={post.post_photo} size='big' />
            {this.props.user.currentUser.liked_posts.find(liked_post => {
                  return post.id === liked_post.id
              }) ? 
              <div>
                <Button size='mini'
                name='unlike'
                onClick={() => this.handleUnlikeBtn(this.props.user.currentUser.id, post.id)}
                > ❤️ </Button>
              </div>
              :
              <div>
                <Button
                name='like'
                onClick={ () => this.handleLikeBtn(this.props.user.currentUser.id, post.id)}
                size='mini'> ♡ </Button>
              </div>
            }
            <Divider hidden />
        </div>
      )
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
    addLike: (userId, postId) => {dispatch(addLike(userId, postId))},
    unlikePost: (userId, postId) => {dispatch(unlikePost(userId, postId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))