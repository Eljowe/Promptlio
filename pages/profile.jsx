import { useEffect, useState } from 'react';
import { withAuthenticator, AmplifyS3Image, useAuthenticator } from '@aws-amplify/ui-react';
import { Auth, API, Storage, withSSRContext } from 'aws-amplify';
import * as queries from '../src/graphql/queries';
import * as mutations from '../src/graphql/mutations';
import CreateTodo from '../src/components/CreateTodo';
import { Login } from "../src/components/Login";
import Link from 'next/link';
import Router from 'next/router';
import { createTodo, deleteTodo } from '../src/graphql/mutations';
import { UploadImage } from "../src/components/UploadImage"
import { Button, Card, Col, Container, Form, Row, FileUploader   } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

function ProfilePage({authenticated, username}) {
  const [todos, setTodos] = useState([]);
  const { user } = useAuthenticator();

  const fetchTodos = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub;

      const todoData = await API.graphql({
        query: queries.listTodos,
        variables: { userId },
      });

      setTodos(todoData.data.listTodos.items);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  const signOutHandler = async () => {
    try {
      await Auth.signOut();
      Router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onCreateTodo = async (todo, todoDescription) => {
    try {
      const newTodo = await API.graphql({
        query: createTodo,
        variables: {
            input: {
        "name": `${todo}`,
        "description": `${todoDescription}`
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
        }
    });

      setTodos((prevTodos) => [...prevTodos, { ...newTodo.data.createTodo }]);
  
      console.log('Successfully created a todo!');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const onDeleteTodo = async(id) => {
    try {
      const res = await API.graphql({
        query: deleteTodo,
        variables: {
            input: {
                id: id
            }
        }
      });
      fetchTodos();
    } catch (e) {
      console.error('Error:', error);
    }
  }

  if(!user){
    return <Login/>
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center py-8">
        <Link className='text-white hover:text-blue-700 px-4' href="/">Home</Link>
        <Link className='text-white hover:text-blue-700 px-4' href="/profile">Profile</Link>
        <Link className='text-white hover:text-blue-700 px-4' href="/images">Images</Link> 
        <button
          className="text-center hover:text-blue-700 text-white px-4 rounded"
          onClick={signOutHandler}
        >
          Logout
        </button>
      </div>
      <div className='flex flex-col items-center'>
        <CreateTodo onCreateTodo={onCreateTodo} />
      </div>
      <div className="flex flex-row items-center justify-center flex-wrap sd:flex-wrap-reverse">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="w-full sm:w-[42%] md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 m-3 flex flex-col items-center justify-center border-2 border-blue-600 rounded-xl"
          >
            <p>{todo.name}</p>
            <p>{todo.description}</p>
            <Button
              className='font-light'
              color={'#ffffff'}
              variation="destructive"
              onClick={() => onDeleteTodo(todo.id)}
              loadingText=""
              ariaLabel=''
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuthenticator(ProfilePage);