import history from './history'

const addPostAction = (post) => {
    return {
        type: "ADD_POST",
        post
    }

}

const deletePostAction = (post) => {
    return {
        type: "DELETE_POST",
        post: post.id
    }
}

const allPosts = posts => {
    return {
        type: "ALL_POSTS",
        posts
    }
}

export const addPost = (post) => {
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
        })
        .catch(error => console.log(error))
    }
}


export const  deletePost = (post) => {

    return function(dispatch){
        fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => dispatch(deletePostAction(data)))
    }
}

export const fetchPosts = () => {

    return function(dispatch){
        fetch("http://localhost:3000/api/v1/posts")
        .then(resp => resp.json())
        .then(data => dispatch(allPosts(data)))}
}