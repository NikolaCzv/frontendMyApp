import history from './history'

const userLogin = (user) => {
    return{
        type: 'USER_LOGIN',
        user
    }
}

export const signout = () => {
    return{
        type: 'SIGN_OUT'
    }
}

export const login = user => {
  
     return function(dispatch){
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          } 

        fetch('http://localhost:3000/api/v1/login', reqObj)
        .then(resp => resp.json())
        .then(userData => {
            if(userData.error){
            alert('Invalid Password or Username')
            } else {
            localStorage.setItem('token', userData.token)
            dispatch(userLogin(userData))
            history.push('/dashboard')
        }
      })
    }

}
export const checkUser = token => {
    
    return dispatch => {
        const reqObj = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }  
        }

        fetch('http://localhost:3000/api/v1/current_user', reqObj)
        .then(resp => resp.json())
        .then(userData => {
            if(userData.error){
                this.props.history.push('/login')
            } else {
                dispatch(userLogin(userData))
            }
        })
    }
}

export const signup = user => {
    return function(dispatch){

            const reqObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            } 

        fetch('http://localhost:3000/api/v1/signup', reqObj)
        .then(resp => resp.json())
        .then(userData => {
            if(userData.error){
                alert('Invalid input')
            } else {
                localStorage.setItem('token', userData.token)
                dispatch(userLogin(userData))
                history.push('/dashboard')
            }
        })
    }
}
