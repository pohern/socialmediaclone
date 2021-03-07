import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import gql from "graphql-tag";
import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from "../util/graphql";


export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
      variables: values,
      update(proxy, result){
          proxy.readQuery({

          })
          console.log(result)
          values.body = ''
      }
  })

  function createPostCallback(){
      createPost()
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h2>Create A Post</h2>
        <Form.Field>
          <Form.Input
            placeholder='Hello'
            name='body'
            onChange={onChange}
            value={values.body}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
