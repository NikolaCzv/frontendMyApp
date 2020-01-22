import React from 'react'
import { Button, Divider, Grid, Segment, Header, Container, Image } from 'semantic-ui-react'

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
                    the rest of the world! Traveling is not easy, thats why we are here to try to make it easier
                    and cheaper for you. You can post and share experience in the same time you can book places from
                    you friends! Isn't that amazing? 
                </p>
                <Image src='C:/Users/nikolaraicic/Desktop/ProjectPhotos/ScreenShot.png' />
                <p>
                    I started building the app just right after the Australias fire started. I would like to point you to the 
                    horrifying happening and ask for your attention. People and animals of Australia are in real need of help.<br></br>
                    24 people died, 2000 houses destroyed and 1.25 billion have been killed in the fire.
                    You can donate <a href="https://www.wwf.org.au/get-involved/bushfire-emergency#gs.teuwm9"> here </a>.
                </p>
                </Container>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' color='green' onClick={this.handleSignup}/>
            <Divider hidden/>
            <Button content='Login' icon='signup' color='green' size='big' onClick={this.handleLogin}/>
          </Grid.Column>
        </Grid>
    
        <Divider vertical></Divider>
      </Segment>
    }
}

export default Homepage