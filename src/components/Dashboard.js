import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { allUsers } from '../actions/userLogin'
import { Image, Divider, Header, Grid, Label} from 'semantic-ui-react'

class Dashboard extends React.Component {

  componentDidMount(){
    this.props.allUsers(this.props.user.currentUser)
  }

  renderFolloweesPosts = () => {
    const followees = this.props.user.currentUser.followees.map( user => user.username)
    const compared = this.props.user.currentUser.users.filter(user => {
      return followees.includes(user.username)
    })

    let allPosts = []
    compared.forEach(follower => 
      allPosts = [...allPosts, ...follower.posts]
      )
    const ids = allPosts.map(post => post.user_id)

    const c = compared.filter( user => {
      return user.id !== ids
    })

    const userId = compared.map( user => {
      return user.id
    })

    console.log('aaaaa', c)
      console.log(compared)
      debugger
      console.log(allPosts)
      return allPosts.map( post => {
          return (<div>
                      <Label as='a' image>
                          <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                          Elliot
                      </Label>
                      <Header as='h3'>{post.text}</Header>
                      <Image src={post.pic_url} size='big' />
                      <Divider hidden />
                </div>)

      })
  }

  renderImage = () => {
  }

    render(){
      console.log(this.props.user)
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
    allUsers: user => {dispatch(allUsers(user))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(Dashboard))