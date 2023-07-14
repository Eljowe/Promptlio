import Router from 'next/router';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { useAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';


function Navbar() {
    const { user } = useAuthenticator();
    const { signOut } = useAuthenticator(context => [context.signOut]);

    const signOutHandler = async () => {
        try {
            await signOut({ callbackUrl: "/api/auth/logout", });
            //await Auth.signOut();
            window.location.replace('/api/auth/logout');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-row items-center justify-center py-8">
            <a className='text-white hover:text-blue-700 px-4' href="/" >Home</a>
            {user ? <a className=' text-white hover:text-blue-700 px-4' href="/profile" >Profile</a> : <a className='text-white hover:text-blue-700 px-4' href="/login">Login</a>}
            {user ? <a className='text-white hover:text-blue-700 px-4' href="/images" >Images</a> : null}
            {user ? <a className='text-white hover:text-blue-700 px-4' href="/threejs" >Three</a> : null}
            {!user ? null : <button className='text-white hover:text-blue-700 px-4' onClick={signOutHandler}>Logout</button>}
        </div>
    )
}

export default Navbar