import config from '../src/aws-exports'
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, API } from "aws-amplify";
import Router from 'next/router'
import CreateTodo from "../src/components/CreateTodo";
import { Login } from "../src/components/Login";
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';
import * as mutations from "../src/graphql/mutations";
import * as queries from '../src/graphql/queries';
import React, { useState } from "react";

export async function getStaticProps() {
  const todoData = await API.graphql({
    query: queries.listTodos,
  });

  return {
    props: {
      todos: todoData.data.listTodos.items,
    }
  };
}

export default function App({ todos }) {
  const { user } = useAuthenticator();
  const { signOut } = useAuthenticator();
  const [todoList, setTodoList] = useState(todos);

  const signOutHandler = () => {
    signOut();
    Router.push('/');
  }

  const onCreateTodo = async (todo) => {
    const newTodo = {
      title: todo,
      description: "none",
    };
  
    try {
      await API.graphql({
        query: mutations.createTodo,
        variables: { input: newTodo },
      });
  
      setTodoList((list) => [...list, { ...newTodo }]);
  
      console.log("Successfully created a todo!");
    } catch (err) {
      console.log("error: ", err);
    }
  };

  if (user) {
    return (
      <div className='flex flex-col'>
        <CreateTodo onCreateTodo={onCreateTodo} />
        <div className='flex flex-row items-center justify-center py-8'>
          <Link className='px-4 text-center hover:text-blue-700 text-whiterounded' href='/'>Home</Link>
          <button className="text-center hover:text-blue-700 text-white px-4 rounded" onClick={signOutHandler}>Logout</button>
        </div>
        <div className="flex flex-row items-center justify-center flex-wrap sd:flex-wrap-reverse">
          <div className='w-full sm:w-[42%] md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 m-3 flex flex-col items-center justify-center border-2 border-blue-600 rounded-xl'>
            <p>Hello</p>
            <p>Heei</p>
            <p>Hello</p>
            <p>Heei</p>
            <p>Hello</p>
            <p>Heei</p>
            <p>Hello</p>
            <p>Heei</p>
          </div>
          <div className='w-full sm:w-[42%] md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 m-3 flex flex-col items-center justify-center border-2 border-blue-600 rounded-xl'>
            <p>Hello</p>
            <p>Heei</p>
            <p>Hello</p>
            <p>Heei</p>
            <p>Hello</p>
            <p>Heei</p>
            <p>Hello</p>
            <p>Heei</p>
          </div>
          <div className='w-full sm:w-[42%] md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 m-3 flex flex-col items-center justify-center border-2 border-blue-600 rounded-xl'>
            <p>1</p>
            <p>2</p>
          </div>
          <div className='w-full sm:w-[42%] md:w-1/3 lg:w-1/3 xl:w-1/4 p-2 m-3 flex flex-col items-center justify-center border-2 border-blue-600 rounded-xl'>
            <p>1</p>
            <p>2</p>
          </div>
        </div>
      </div>
    )
  }

  return <Login />;
}
