import React from 'react'
import Navbar from './Navbar'
import {
    Button,
    Form,
    Grid,
    Divider,
    Image,
    Header,
    Input
} from 'semantic-ui-react';
import { connect } from 'react-redux'
import { editProfile, deleteProfile } from '../actions/userLogin'

class EditProfile extends React.Component{

    state = {
        username: this.props.user.currentUser.username,
        email: this.props.user.currentUser.email,
        id: this.props.user.currentUser.id,
        photo: this.props.user.profile_photo,
        hometown: this.props.user.currentUser.hometown
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.editProfile(this.state)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDeleteBtn = user => {
        this.props.deleteProfile(user)
    }


    handleFile = (event) => {
        this.setState({photo: event.currentTarget.files[0]})
    }

    render(){
        return (
            <div>
                <div>
                    < Navbar />
                </div>
                <div>
                <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='green' textAlign='center'>
                            Edit Your Profile
                        </Header>
                        <Divider hidden />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                            <Image src={this.props.user.currentUser.profile_photo}
                                    size='big'/><br></br>
                            <Input type='file' onChange={this.handleFile}/>
                            <label>Username</label>
                            <input value={this.state.username}
                            name='username'
                            type='text'
                            onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Home Town</label>
                            <input value={this.state.hometown}
                            name='hometown'
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
                            <Button type='submit' color='green' fluid size='large'>Submit</Button><br></br>
                            <Button onClick={() => this.handleDeleteBtn(this.props.user.currentUser)} fluid size='large' color='red'>Delete Profile</Button>
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