import config from '../src/aws-exports'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google';
import { Amplify, Auth } from 'aws-amplify';
import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";
 
const montserrat = Montserrat({ 
  weight: '400',
  subsets: ['latin'] 
});

Amplify.configure({ ...config, ssr: true })
Auth.configure({...config});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
            html {
              font-family: ${montserrat.style.fontFamily};
            }
      `}</style>
      <AmplifyProvider>
        <Authenticator.Provider>
          <Component {...pageProps} />
          </Authenticator.Provider>
      </AmplifyProvider>
    </>
    
  );
}
