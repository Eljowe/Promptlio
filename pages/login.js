import config from '../src/aws-exports'
import { redirect } from 'next/navigation';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { Login } from "../src/components/Login";
import '@aws-amplify/ui-react/styles.css';
import Router from 'next/router'

export default function App() {
  const { user } = useAuthenticator();
  if (user) {
    Router.push('/');
  }
  return(
    <Login />
  )
}
