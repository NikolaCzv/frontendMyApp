import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { Grid, Image, Card, Icon, Button, Menu } from 'semantic-ui-react'
import WithAuth from './WithAuth'

class MyProfile extends React.Component{

    state = { activeItem: '' }

    handleItemClick = () => {
        console.log('clikced')
    }

    render(){
        console.log(this.props)
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
                                    <a>
                                        <Icon name='user' />
                                            22 Friends
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
                                onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                name='my friedns'
                                onClick={this.handleItemClick}
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