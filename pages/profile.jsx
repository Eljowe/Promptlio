import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

import { Profile } from "../src/layouts/Profile";
import { Login } from "../src/components/Login";
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';

import awsExports from "../src/aws-exports";
Amplify.configure(awsExports);

export default function App() {
  const { user } = useAuthenticator();
  const { signOut } = useAuthenticator();

  if (user) {
    return (
      <>
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
        <Link className='w-1/2 mx-2 mt-10 text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' href='/'>Home</Link>
      </>
    )
  }

  return <Login />;
}