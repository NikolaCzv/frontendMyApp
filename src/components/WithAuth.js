import React from 'react'
import { checkUser } from '../actions/userLogin'
import { connect } from 'react-redux'

export default function WithAuth(WrappedComponent) {
    class Auth extends React.Component{
        constructor(props){
            super(props)
        }
        
        componentDidMount(){
            const token = localStorage.getItem('token')
            
            if(!token){
                this.props.history.push('/login')
            } else {
                this.props.checkUser(token)
            }
        }

        render(){
            return <WrappedComponent {...this.props} />
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            checkUser: user => { dispatch(checkUser(user))}
        }
    }

    return connect(null, mapDispatchToProps)(Auth)
}