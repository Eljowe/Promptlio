import Image from 'next/image'

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Hello from main</h1>
        <a className='w-1/2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700' href="/profile">Profile</a>
      </div>
    </main>
  )
}
