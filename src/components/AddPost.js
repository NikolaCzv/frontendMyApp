import React from 'react'
import Navbar from './Navbar'
import { Button, Grid, Header, Input} from 'semantic-ui-react'

class AddPost extends React.Component {

    render(){
        return<div>
                    <div>
                        < Navbar />
                    </div>
                    <div>
                    <Grid textAlign='center'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='green' textAlign='center'>
                            Add New Post
                        </Header>
                        <Input placeholder='Add Content...' />
                        <Button color='orange' size='medium'> Upload Photo </Button>
                    </Grid.Column>
            </Grid>


                    </div>
            </div>
    }
}

export default AddPost