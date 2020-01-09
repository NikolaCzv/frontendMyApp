import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { login } from '../actions/userLogin'
import { connect } from 'react-redux'

class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = event => {
    event.preventDefault()
    this.props.login(this.state)
  }


    render(){
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src='https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/3577562/910/607/m1/fpnw/wm0/preview-16-.jpg?1510687184&s=e5e2c8201a94c91a67e04ffbc763c504' circular/>
              <Header as='h2' color='green' textAlign='center'>
                Log-in to your account
              </Header>
              <Form size='large' onSubmit={this.handleLogin}>
                <Segment stacked>
                  <Form.Input 
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    name='username'
                    onChange={(event) => this.handleInputChange(event)}
                    />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    onChange={(event) => this.handleInputChange(event)}
                  />
        
                  <Button color='green' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='/signup'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => { dispatch(login(user))}
  }
}

export default connect(null, mapDispatchToProps)(Login);