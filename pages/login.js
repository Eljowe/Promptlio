import config from '../src/aws-exports'
import { redirect } from 'next/navigation';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { Login } from "../src/components/Login";
import '@aws-amplify/ui-react/styles.css';

export default async function Home({ params }) {
  const { user } = useAuthenticator();
  if (user) {
    redirect('/');
  }
  return(
    <Login />
  )
}
