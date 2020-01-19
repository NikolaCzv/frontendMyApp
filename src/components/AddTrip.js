import React from 'react'
import Navbar from './Navbar'
import WithAuth from './WithAuth'
import { connect } from 'react-redux'
import { createTrip } from '../actions/trips'
import { Button, Form, Divider, Label} from 'semantic-ui-react'

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
            <div>
                <div>
                    < Navbar />
                </div>
                <div>
                    <Form size='small' onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                            <Form.Field>
                                <label> Start Date </label>
                                <input
                                    name='startDate'
                                    placeholder='YYYY-MM-DD'
                                    onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>End Date</label>
                                <input
                                    name='endDate'
                                    placeholder='YYYY-MM-DD'
                                    onChange={this.handleChange}/>
                            </Form.Field>
                            </Form.Group>
                        <Button type='submit' color='green'>Submit</Button>
                        <Divider hidden />
                    </Form>
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