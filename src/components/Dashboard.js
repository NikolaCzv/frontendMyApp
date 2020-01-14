import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { userFollowees, fetchUser, allUsers } from '../actions/userLogin'
import { Image, Divider, Header, Grid, Label} from 'semantic-ui-react'

class Dashboard extends React.Component {

  componentDidMount(){
    this.props.userFollowees(this.props.user.currentUser)
    this.props.allUsers(this.props.user.currentUser)
  }

  componentDidUpdate(prevProps, prevState){
    if(!prevProps.user.currentUser.id && this.props.user.currentUser.id){
        this.props.allUsers(this.props.user.currentUser)
    }
}

renderUserPage = user => {
  this.props.fetchUser(user)
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
    return posts.map(post => {
      return(  
        <div>
          <Header as='h3'>{post.text}</Header>
            <Image src={post.pic_url} size='big' />
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
    allUsers: user => {dispatch(allUsers(user))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))