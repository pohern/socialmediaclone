import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
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
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
        <hr />
      </Grid.Row>
      <Grid.Row>
          { user && (
              <Grid.Column>
                  <PostForm />
              </Grid.Column>
          )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id}>
              <Postcard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}




export default Home;
