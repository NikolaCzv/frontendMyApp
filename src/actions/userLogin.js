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

 const userPage = (user) => {

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

const editUser = (user) => {
    return{
        type: 'EDIT_USER',
        user
    }
}

const deleteUser = user => {
    return{
        type: 'DELETE_USER',
        user: user.id
    }
}

const getFollowees = followees => {
    return {
        type: 'USER_FOLLOWEES',
        followees   
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
                history.push('/login')
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
            dispatch(usersFetch(data))
        })
    }
}


export const fetchUser = (user) => {

    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/show_user/${user.id}`)
        .then(resp => resp.json())
        .then(data => {
            dispatch(userPage(data))
            history.push(`/profile/${user.id}`)       
        })
    }
}

export const showUserPage = (userId) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/show_user/${userId}`)
        .then(resp => resp.json())
        .then(data => {
            dispatch(userPage(data))       
        })
    }
}

export const editProfile = user => {

    return function(dispatch) {

        const formData = new FormData();
        formData.append('username', user.username)
        formData.append('email', user.email)
        formData.append('hometown', user.hometown)
        formData.append('photo', user.photo)

        const reqObj = {
            method: 'PATCH',
            body: formData
        }

        fetch(`http://localhost:3000/api/v1/show_user/${user.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            dispatch(editUser(data))
            history.push('/myProfile')
        })
    }
}


export const  deleteProfile = (user) => {

    return function(dispatch){
        fetch(`http://localhost:3000/api/v1/show_user/${user.id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => dispatch(deleteUser(data)))
        history.push('/login')
    }
}


export const userFollowees = (user) => {

    return function(dispatch){
        if(user){
        fetch(`http://localhost:3000/api/v1/users/${user.id}/user_followees`)
        .then(resp => resp.json())
        .then(data => dispatch(getFollowees(data)))
        .catch(err => console.log(err))
        }
        else {
            console.log('error')
        }
    }
}
