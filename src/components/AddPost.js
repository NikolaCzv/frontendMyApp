import React from 'react'
import Navbar from './Navbar'
import { Button, Grid, Header, Input, Form} from 'semantic-ui-react'
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
        return<div>
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
                            <Input type='file' onChange={this.handleFile}/>
                            <Button type="submit" color='orange'> Submit </Button>
                        </Form>
                    </Grid.Column>
            </Grid>


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