import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from '../util/graphql'

import { AuthContext } from '../context/auth'
import Postcard from "../components/Postcard";
import PostForm from '../components/PostForm'




function Home() {

    const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
 
  return (
      <>
      {!user && (
          <h3 style={{textAlign:'center', fontSize:'5rem'}}>Please Log In to see posts</h3>
      )}
      {user && (
         <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
        <hr />
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          <Transition.Group>
            {posts && posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <Postcard post={post} />
            </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid> 
      )}
      </>
  );
}




export default Home;
