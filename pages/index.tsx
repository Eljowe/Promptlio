import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Hello from main</h1>
        <Link className='p-2 text-white hover:text-blue-700 my-10 py-4' href="/profile">Profile</Link>
      </div>
    </main>
  )
}
