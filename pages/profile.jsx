import { useEffect, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth, API } from 'aws-amplify';
import * as queries from '../src/graphql/queries';
import * as mutations from '../src/graphql/mutations';
import CreateTodo from '../src/components/CreateTodo';
import { Login } from '../src/components/Login';
import Link from 'next/link';
import Router from 'next/router';
import { createTodo } from '../src/graphql/mutations';

function ProfilePage() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub;

      const todoData = await API.graphql({
        query: queries.listUserTodos,
        variables: { userId },
      });

      setTodos(todoData.data.listUserTodos.items);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const signOutHandler = async () => {
    try {
      await Auth.signOut();
      Router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onCreateTodo = async (todo) => {
  
    try {
      const newTodo = await API.graphql({
        query: createTodo,
        variables: {
            input: {
        "name": `${todo}`,
        "description": "Lorem ipsum dolor sit amet"
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
        }
    });
  
      setTodos((prevTodos) => [...prevTodos, { ...newTodo }]);
  
      console.log('Successfully created a todo!');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <CreateTodo onCreateTodo={onCreateTodo} />
      <div className="flex flex-row items-center justify-center py-8">
        <Link href="/">Home</Link>
        <button
          className="text-center hover:text-blue-700 text-white px-4 rounded"
          onClick={signOutHandler}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-row items-center justify-center flex-wrap sd:flex-wrap-reverse">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="w-full sm:w-[42%] md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 m-3 flex flex-col items-center justify-center border-2 border-blue-600 rounded-xl"
          >
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuthenticator(ProfilePage);