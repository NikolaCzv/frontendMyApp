import React from 'react'
import { Button, Form, Grid, Divider, Image, Header} from 'semantic-ui-react'

class SignUp extends React.Component {

    handleBackButton = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
            <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Image src='http://aweber.design/gifs/images/Sans/Sans-Green-WBG.gif'
                                size='big' />
                        <Divider hidden />
                        <Header as='h2' color='green' textAlign='center'>
                            Please sign-up
                        </Header>
                        <Form>
                            <Form.Field>
                            <label>Username</label>
                            <input placeholder='Username' />
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input placeholder='joe@schmoe.com'
                                error={{
                                    content: 'Please enter a valid email address',
                                    pointing: 'below',
                                        }}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' 
                            type='password'
                            />
                            </Form.Field>
                            <Button type='submit' color='green' fluid size='large'>Submit</Button><br></br>
                            <Button onClick={this.handleBackButton} fluid size='large'>Back to Login Page</Button>
                        </Form>
                    </Grid.Column>
            </Grid>

        )
    }
}

export default SignUp