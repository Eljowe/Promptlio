import { withSSRContext } from "aws-amplify";


export async function authenticatedUsers(context) {
    const { Auth } = withSSRContext(context);
    try {
      await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.log(error)
      return true
    }
    return false
  }
  
  export const getServerSideProps = async (ctx) => {
    let shouldRedirect = await authenticatedUsers(ctx);
    console.log(ctx)
    if (shouldRedirect) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: {}
    }
  }