import Image from 'next/image'
import Link from 'next/link'
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Home() {
  const { user } = useAuthenticator();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start px-24 py-4`}
    >
      <div className='flex min-w-screen flex-row items-center justify-between py-8'>
        <p className='px-4'>Promptlio</p>
        {user ? <Link className=' text-white hover:text-blue-700 px-4' href="/profile">Profile</Link> : <Link className='text-white hover:text-blue-700 my-10 py-4' href="/profile">Login</Link>}
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Hello from main</h1>
      </div>
    </main>
  )
}
