import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google';
import { Amplify, Auth } from 'aws-amplify';
import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";

import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
 
const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AmplifyProvider>
      <Authenticator.Provider>
        <style jsx global>{`
          html {
            font-family: ${montserrat.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
        </Authenticator.Provider>
    </AmplifyProvider>
  );
}
