import config from '../src/aws-exports'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google';
import { Amplify, Auth } from 'aws-amplify';
import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";
import Head from 'next/head'; 
 


const montserrat = Montserrat({
  subsets: ['latin'] 
});

Amplify.configure({ ...config, ssr: false })
Auth.configure({...config});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montserrat.className}>
      <AmplifyProvider>
        <Authenticator.Provider>
          <Component {...pageProps} />
          </Authenticator.Provider>
      </AmplifyProvider>
    </main>
    
  );
}
