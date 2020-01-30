import React from 'react'
import Navbar from './Navbar'
import { Button, Grid, Header, Input, Form, Image, Divider} from 'semantic-ui-react'
import WithAuth from './WithAuth'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

class AddPost extends React.Component {

    state = {
        text: '',
        user_id: this.props.user.currentUser.id,
        photo: null
    }

    handleInput = (event) => {
        this.setState({ text: event.target.value})
    }

    handleFile = (event) => {
        this.setState({photo: event.currentTarget.files[0]})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addPost(this.state)
    }

    render(){
        return<div className='addPost'>
                    <div>
                        < Navbar />
                    </div>
                    <div>
                    <Grid textAlign='center'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='green' textAlign='center'>
                                Add New Post
                            </Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Input type='text' placeholder='Add Content...'  value={this.state.text} onChange={this.handleInput}/>
                                <label className='ui button' htmlFor='uploadPhoto'>Choose Picture</label>
                                <input hidden id='uploadPhoto' type='file' onChange={this.handleFile} /><br></br>
                                < Divider hidden/>
                                <Button type="submit" color='orange'> Submit </Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                    <Image src='https://i.pinimg.com/564x/37/94/6b/37946b3b63f12482bd77be116c3cfc72.jpg' size='big' />
                    </div>
            </div>
    }
}

const mapStateToProps = state => {
    return {
        user: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: post => {dispatch(addPost(post))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(AddPost))