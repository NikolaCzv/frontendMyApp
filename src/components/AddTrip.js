import React from 'react'
import Navbar from './Navbar'
import WithAuth from './WithAuth'
import { connect } from 'react-redux'
import { createTrip } from '../actions/trips'
import { Button, Form, Divider, Image, Header} from 'semantic-ui-react'

class AddTrip extends React.Component {

    state = {
        startDate: '',
        endDate: '',
        user_id: this.props.user.currentUser.id
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.createTrip(this.state)
    }

    render(){
        return(
            <div className='addTrip'>
                <div>
                    < Navbar />
                </div>
                <div>
                    <Form size='small' onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                            <Form.Field>
                                <Header > Start Date </Header>
                                <input
                                    name='startDate'
                                    placeholder='YYYY-MM-DD'
                                    onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Header>End Date</Header>
                                <input
                                    name='endDate'
                                    placeholder='YYYY-MM-DD'
                                    onChange={this.handleChange}/>
                            </Form.Field>
                            </Form.Group>
                        <Button type='submit' color='green'>Submit</Button>
                        <Divider hidden />
                    </Form>
                    <Image src='https://i.pinimg.com/564x/37/94/6b/37946b3b63f12482bd77be116c3cfc72.jpg' size='big' />
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

const mapDispatchToProps = dispatch => {
    return {
        createTrip: trip => {dispatch(createTrip(trip))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(AddTrip))