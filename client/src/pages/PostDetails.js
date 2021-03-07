import React from "react";
import gql from "graphql-tag";

function SinglePost(props) {
  const postId = props.match.params.postId;
}

const FETCH_POST_QUERY = gql`
  query($postID: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
