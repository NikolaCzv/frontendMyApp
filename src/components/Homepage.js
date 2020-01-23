import React from 'react'
import { Button, Divider, Grid, Segment, Header, Container, Image } from 'semantic-ui-react'
import ScreenShot from '../ScreenShot.png'

class Homepage extends React.Component {

    handleLogin = () => {
        this.props.history.push('/login')
    }

    handleSignup = () => {
        this.props.history.push('/signup')
    }

    render(){
        return   <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
          <Container fluid>
                <Header as='h2' color='green'>Travel Smart App</Header>
                <p>
                    Travel Smart App is made for people who like to travel and also like to share experience with
                    the rest of the world! Traveling is not easy, that's why we are here to try to make it easier
                    and cheaper for you. You can post and share experience in the same time you can book places from
                    your friends! Isn't that amazing? 
                </p>
                < Divider hidden />
                <Image src={ScreenShot} alt='ScreenShot' />
                < Divider hidden />
                <p>
                    I started building the app just right after the Australias fire started. I would like to point you to the 
                    horrifying happening and ask for your attention. People and animals of Australia are in real need of help.<br></br>
                    24 people died, more then 2000 houses destroyed and 1.25 billion animals have been killed in the fire.
                    You can donate <a href="https://www.wwf.org.au/get-involved/bushfire-emergency#gs.teuwm9"> here </a>.
                </p>
                <Image src='https://cdn.cnn.com/cnnnext/dam/assets/191220111759-01-australia-bushfire-1219-exlarge-169.jpg' />
                </Container>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='large' color='green' onClick={this.handleSignup}/>
            <Divider hidden/>
            <Button content='Login' icon='signup' color='green' size='large' onClick={this.handleLogin}/>
          </Grid.Column>
        </Grid>
    
        <Divider vertical></Divider>
      </Segment>
    }
}

export default Homepage