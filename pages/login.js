import config from '../src/aws-exports'
import { redirect } from 'next/navigation';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { Login } from "../src/components/Authorization/Login";
import '@aws-amplify/ui-react/styles.css';
import Router from 'next/router'
import { getServerSideProps } from "@/src/utils/authenticatedUsers";


export default function App({ page }) {
  const { user } = useAuthenticator();
  if (user) {
    Router.push('/');
  }
  return(
    <Login />
  )
}
