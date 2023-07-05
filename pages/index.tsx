import Link from 'next/link'
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Home() {
  const { user } = useAuthenticator();
  const { signOut } = useAuthenticator(context => [context.signOut]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start`}
    >
      <div className="flex flex-row items-center justify-center py-8">
        <Link className='text-white hover:text-blue-700 px-4' href="/">Home</Link>
        {user ? <Link className=' text-white hover:text-blue-700 px-4' href="/profile">Profile</Link> : <Link className='text-white hover:text-blue-700 px-4' href="/login">Login</Link>}
        {user ? <Link className='text-white hover:text-blue-700 px-4' href="/images">Images</Link> : null}
        {!user ? null : <button className='text-white hover:text-blue-700 px-4' onClick={signOut}>Logout</button>}
      </div>
      <div className="w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl">Hello from main</h1>
      </div>
    </main>
  )
}
