import styles from '../styles/Profile.module.css'
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link'


function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <Link className='w-1/2 mx-2 mt-10 text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' href='/'>Home</Link>
    </>
  );
}

export default withAuthenticator(App);
