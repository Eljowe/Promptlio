import {
    Authenticator,
    Flex,
    Grid,
    Image,
    useTheme,
    View
  } from "@aws-amplify/ui-react";
  
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
          backgroundColor="#e0baba"
          justifyContent="center"
        >
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
            src="https://img.freepik.com/free-vector/modern-mosaic-wallpaper-rose-gold-black_53876-58064.jpg?w=1380&t=st=1686584257~exp=1686584857~hmac=41d4ddf7b44b347f4215fe03626a1737ccdf02a0c0bbe9d813d53fc56246e436"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </View>
      </Grid>
    );
  }
  