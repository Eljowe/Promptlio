import config from '../src/aws-exports'
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import Router from 'next/router'

import { Login } from "../src/components/Login";
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';

export default function App() {
  const { user } = useAuthenticator();
  const { signOut } = useAuthenticator();

  const signOutHandler = () => {
    signOut();
    Router.push('/');
  }

  if (user) {
    return (
      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-center py-8'>
          <h1 className="text-center text-md px-4">Hello {user.username}</h1>
          <Link className='px-4 text-center hover:text-blue-700 text-whiterounded' href='/'>Home</Link>
          <button className="text-center hover:text-blue-700 text-white px-4 rounded" onClick={signOutHandler}>Sign out</button>
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
