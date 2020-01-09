import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import WithAuth from './WithAuth'
import { Image, List, Input } from 'semantic-ui-react'

class FriendsList extends React.Component {

    state = {
        searchTerm: ''
    }

    handleSearch = (event) => {
        this.setState({
          searchTerm: event.target.value
        })
    }

    renderFolowees(){
        const allFollowees = this.props.user.currentUser.followees.filter(followee => followee.username.toLowerCase().includes(this.state.searchTerm))

       return allFollowees.map((follow, index) => {
        return   (
            <div>
                <List key={index} animated verticalAlign='middle'>
                    <List.Item>
                        <Image avatar src={follow.profile_pic_url} />
                        <List.Content>
                            <List.Header>{follow.username}</List.Header>
                        </List.Content>
                    </List.Item>
                </List>

            </div>
                )
       })
    }

    render(){

        return(
            <div>
                <div>
                    < Navbar />
                </div>
                <div>
                    <Input icon='users' iconPosition='left' placeholder='Search users...' onChange={this.handleSearch}/>
                </div>
                <div>
                    {this.renderFolowees()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state
    }
}

export default connect(mapStateToProps)(WithAuth(FriendsList))