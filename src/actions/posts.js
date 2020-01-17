import history from './history'

const addPostAction = (post) => {
    return {
        type: "ADD_POST",
        post
    }

}

export const addPost = (post) => {
// debugger
    return function(dispatch){

        const formData = new FormData();
        formData.append('user_id', post.user_id)
        formData.append('text', post.text)
        formData.append('photo', post.photo)

        const reqObj = {
            method: 'POST',
            body: formData
        }


        fetch('http://localhost:3000/api/v1/posts', reqObj)
        .then(resp => resp.json())
        .then(data => {
            dispatch(addPostAction(data))
            history.push('/myProfile')
            console.log(data)
        })
        .catch(error => console.log(error))
    }
}