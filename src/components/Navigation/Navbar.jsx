import Router from 'next/router';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { useAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';


function Navbar() {
    const { signOut } = useAuthenticator(context => [context.signOut]);

    const signOutHandler = async () => {
        try {
            await signOut();
            //await Auth.signOut();
            Router.push('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-row items-center justify-center py-8">
            <Link className='text-white hover:text-blue-700 px-4' href="/">Home</Link>
            <Link className=' text-white hover:text-blue-700 px-4' href="/profile">Profile</Link>
            <Link className=' text-white hover:text-blue-700 px-4' href="/images">Images</Link>
            <Link className=' text-white hover:text-blue-700 px-4' href="/threejs">Three</Link>
            <button
            className="text-center hover:text-blue-700 text-white px-4 rounded"
            onClick={signOutHandler}
            >
            Logout
            </button>
        </div>
    )
}

export default Navbar