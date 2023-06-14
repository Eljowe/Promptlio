import Image from 'next/image'
import Link from 'next/link'
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Home() {
  const { user } = useAuthenticator();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Hello from main</h1>
        {user ? <Link className=' text-white hover:text-blue-700 my-10 py-4' href="/profile">Profile</Link> : <Link className='text-white hover:text-blue-700 my-10 py-4' href="/profile">Login</Link>}
      </div>
    </main>
  )
}
