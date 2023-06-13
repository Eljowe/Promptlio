import config from '../src/aws-exports'
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import Router from 'next/router'

import { Profile } from "../src/layouts/Profile";
import { Login } from "../src/components/Login";
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';

Amplify.configure(config);
Auth.configure(config);

export default function App() {
  const { user } = useAuthenticator();
  const { signOut } = useAuthenticator();

  const signOutHandler = () => {
    signOut();
    Router.push('/');
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-center text-3xl p-10">Hello {user.username}</h1>
        <button className="w-40 mx-2 mt-10 text-center bg-blue-500 hover:text-blue-700 text-white py-2 px-4 rounded" onClick={signOutHandler}>Sign out</button>
        <Link className='w-40 mx-2 mt-10 text-center hover:text-blue-700 text-white py-2 px-4 rounded' href='/'>Home</Link>
      </div>
    )
  }

  return <Login />;
}
