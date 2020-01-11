import React from 'react'
import Navbar from './Navbar'
import { Button, Form, Grid, Divider, Image, Header} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { editProfile, deleteProfile } from '../actions/userLogin'

class EditProfile extends React.Component{

    state = {
        username: this.props.user.currentUser.username,
        email: this.props.user.currentUser.email,
        password: '',
        password_confirmation: ''
    }

    handleSubmit = user => {
        this.props.editProfile(user)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDeleteBtn = user => {
        this.props.deleteProfile(user)
    }

    render(){
        console.log(this.props.user.currentUser)
        return (
            <div>
                <div>
                    < Navbar />
                </div>
                <div>
                <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Image src={this.props.user.currentUser.profile_pic_url}
                                size='big'/><br></br>
                        < Button>Change Photo</Button>
                        <Divider hidden />
                        <Header as='h2' color='green' textAlign='center'>
                            Edit Your Profile
                        </Header>
                        <Form onSubmit={() => this.handleSubmit(this.props.user.currentUser)}>
                            <Form.Field>
                            <label>Username</label>
                            <input value={this.state.username}
                            name='username'
                            type='text'
                            onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input
                            type='text'
                            onChange={this.handleChange}
                            value={this.state.email}
                            name='email'
                                error={{
                                    content: 'Please enter a valid email address',
                                    pointing: 'below',
                                        }}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' 
                            type='password'
                            name='password'
                            onChange={this.handleChange}
                            />
                            </Form.Field>
                            <Form.Field>
                            <label>Confirm Password</label>
                            <input placeholder='Password Confirmation' 
                            type='password'
                            name='password_confirmation'
                            onChange={this.handleChange}
                            />
                            </Form.Field>
                            
                            <Button type='submit' color='green' fluid size='large'>Submit</Button><br></br>
                            <Button onClick={() => this.handleDeleteBtn(this.props.user.currentUser)} fluid size='large'>Delete Profile</Button>
                        </Form>
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
    return{
        editProfile: user => {dispatch(editProfile(user))},
        deleteProfile: user => {dispatch(deleteProfile(user))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)