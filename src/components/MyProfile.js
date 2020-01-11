import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { Grid, Image, Card, Icon, Menu } from 'semantic-ui-react'
import WithAuth from './WithAuth'

class MyProfile extends React.Component{

    state = { activeItem: '' }

    editProfile = () => {
        this.props.history.push('/editProfile')
    }



    render(){
        return(
            <div>
                <div>
                    < Navbar />
                </div>
                <div>
                    <Grid>
                        <Grid.Column width={4}>
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
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
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