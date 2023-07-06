import Link from 'next/link'
import { useAuthenticator } from "@aws-amplify/ui-react";
import Router from 'next/router';

export default function Home() {
  const { user } = useAuthenticator();
  const { signOut } = useAuthenticator(context => [context.signOut]);

  const signOutHandler = async () => {
    try {
        await signOut({ callbackUrl: "/api/auth/logout", });
        //await Auth.signOut();
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start`}
    >
      <div className="flex flex-row items-center justify-center py-8">
        <Link className='text-white hover:text-blue-700 px-4' href="/" prefetch={false}>Home</Link>
        {user ? <Link className=' text-white hover:text-blue-700 px-4' href="/profile" prefetch={false}>Profile</Link> : <Link className='text-white hover:text-blue-700 px-4' href="/login" prefetch={false}>Login</Link>}
        {user ? <Link className='text-white hover:text-blue-700 px-4' href="/images" prefetch={false}>Images</Link> : null}
        {!user ? null : <button className='text-white hover:text-blue-700 px-4' onClick={signOutHandler}>Logout</button>}
      </div>
      <div className="w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl">Hello from main</h1>
      </div>
    </main>
  )
}
