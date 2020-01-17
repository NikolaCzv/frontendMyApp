import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { Grid, Image, Card, Icon, Menu, Header} from 'semantic-ui-react'
import WithAuth from './WithAuth'

class MyProfile extends React.Component{

    state = { activeItem: '' }

    editProfile = () => {
        this.props.history.push('/editProfile')
    }

    renderPosts = () => {
        return this.props.user.currentUser.posts.map((post, index) => {
            return     <Card key={index} image={post.post_photo} />
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
                                <Image src={this.props.user.currentUser.profile_pic_url} wrapped ui={false} />
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
                                    <Card.Group itemsPerRow={3}>
                                        {this.renderPosts()}
                                    </Card.Group>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Menu secondary vertical>
                                <Menu.Item
                                name='edit profile'
                                onClick={this.editProfile}
                                />
                            </Menu>
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

export default connect(mapStateToProps)(WithAuth(MyProfile))