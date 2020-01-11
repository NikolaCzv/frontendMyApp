import React from 'react'
import Navbar from './Navbar'
import { Grid, Image, Card, Icon, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import WithAuth from './WithAuth'

class UserShowPage extends React.Component {


    render(){
        const presentUser = this.props.user.currentUser.users.find( user => user.id === this.props.user.currentUser.showUser)
        console.log(presentUser)
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Grid>
                        <Grid.Column width={4}>
                            <Card>
                                <Image src={presentUser.profile_pic_url}  wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{presentUser.username}</Card.Header>
                                            <Card.Description>
                                                Contact: {presentUser.email}
                                            </Card.Description>
                                    </Card.Content>
                                     <Card.Content extra>
                                            <Icon name='user' />
                                            {this.props.user.currentUser.followees.find(u => u.username === presentUser.username ) ?
                                                'Following ✅' : 'Not Following' }
                                    </Card.Content>
                            </Card>
                        </Grid.Column>
                            <Grid.Column width={9}>
                                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Menu secondary vertical>
                                    {this.props.user.currentUser.followees.find(u => u.username === presentUser.username) ? 
                                    <Menu.Item
                                        name='unfollow'
                                        onClick={() => console.log('follow')}
                                        />
                                    :
                                    <Menu.Item
                                    name='follow'
                                    onClick={() => console.log('unfollow')}
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

export default connect(mapStateToProps)(WithAuth(UserShowPage))