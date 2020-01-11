import history from './history'

const userLogin = (user) => {
    return{
        type: 'USER_LOGIN',
        user
    }
}

const usersFetch = (users) => {
    return {
        type: 'ALL_USERS',
        users
    }
}

 const userPage = user => {
    return {
        type: 'SHOW_USER_PAGE',
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


export const allUsers = (currentUser) => {
   
    
    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(data => {
            const fetchedUsers = data.filter( user => user.username !== currentUser.username)
            dispatch(usersFetch(fetchedUsers))
        })
    }
}


export const fetchUser = (user) => {

    return (dispatch) => {
        console.log(user)
        fetch(`http://localhost:3000/api/v1/show_user/${user.id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            dispatch(userPage(data))
            history.push(`/profile/${user.id}`)       
        })
    }
}