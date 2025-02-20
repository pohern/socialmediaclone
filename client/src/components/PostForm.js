import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

//   const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
//     variables: values,
//     update(proxy, result) {
//       const data = proxy.readQuery({
//         query: FETCH_POSTS_QUERY,
//       });

//       let newData = [...data.getPosts];
//       newData = [result.data.createPost, ...newData];
//       proxy.writeQuery({
//         query: FETCH_POSTS_QUERY,
//         data: {
//           ...data,
//           getPosts: {
//             newData,
//           },
//         },
//       });
//       values.body = '';
//     },
//     onError(error) {
//       console.log(error);
//     },
//   });


  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(err) {
      return err;
    },
  });
  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create A Post</h2>
        <Form.Field>
          <Form.Input
            placeholder='Hello'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className='ui error message' style={{ marginBottom: "20px" }}>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
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
