import {
    Authenticator,
    Flex,
    Grid,
    Image,
    useTheme,
    View
  } from "@aws-amplify/ui-react";
  import Link from 'next/link';
  import { Header } from "./Header";
  import { Footer } from "./Footer";
  import { SignInHeader } from "./SignInHeader";
  import { SignInFooter } from "./SignInFooter";
  
  const components = {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  };
  
  export function Login() {
    const { tokens } = useTheme();
  
    return (
      <Grid templateColumns={{ base: "1fr 0", medium: "1fr 1fr" }}>
        <Flex
          backgroundColor="#253342"
          justifyContent="center"
        >
          <Link className='w-40 p-2 text-center hover:text-blue-700 text-whiterounded' href='/'>Home</Link>
          <Authenticator components={components}>
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user.username}</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            )}
          </Authenticator>
        </Flex>
        <View height="100vh">
          <Image
            src="https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>
      </Grid>
    );
  }
  
