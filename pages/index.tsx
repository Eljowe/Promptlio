import Image from 'next/image'
import Link from 'next/link'
import { useAuthenticator } from "@aws-amplify/ui-react";
import Router from 'next/router'

export default function Home() {
  const { user } = useAuthenticator();
  const { signOut } = useAuthenticator();

  function signoutHandler(): void {
    signOut();
    Router.push('/');
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start px-8`}
    >
      <div className='flex min-w-screen flex-row items-center justify-between py-8'>
        <p className='px-4'>Promptlio</p>
        {user ? <Link className=' text-white hover:text-blue-700 px-4' href="/profile">Profile</Link> : null }
        {user ? <button className=' text-white hover:text-blue-700 px-4' onClick={signoutHandler}>Logout</button> : <Link className='text-white hover:text-blue-700 px-4' href="/login">Login</Link>}
      </div>
      <div className="w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl">Hello from main</h1>
      </div>
    </main>
  )
}
