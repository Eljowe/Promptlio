import styles from '../styles/Profile.module.css'
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <a className='w-1/2 mx-2 mt-10 text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' href='/'>Home</a>
    </>
  );
}

export default withAuthenticator(App);