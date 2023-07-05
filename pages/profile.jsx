import { useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth, API } from 'aws-amplify';
import * as queries from '../src/graphql/queries';
import CreateTodo from '../src/components/CreateTodo';
import { Login } from "../src/components/Authorization/Login";
import { createTodo, deleteTodo } from '../src/graphql/mutations';
import { Button } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Navbar from '@/src/components/Navigation/Navbar'

function ProfilePage() {
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
      await API.graphql({
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
      <Navbar />
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

export default ProfilePage