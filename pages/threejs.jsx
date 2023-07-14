import Navbar from '@/src/components/Navigation/Navbar'
import STLview from '../src/components/STLViewer'
import {
    useAuthenticator,
  } from "@aws-amplify/ui-react";
import { Login } from "@/src/components/Authorization/Login";



function App() {
    const { user } = useAuthenticator();

    if(!user){
        return <Login/>
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <Navbar />
            <h1>Hello from three!</h1>
            <div id="3DBox" className='flex flex-col items-center justify-center w-[80vw] h-[80vw] sm:w-[30vw] sm:h-[30vw]'>
                <STLview STL="/scanner.STL"/>
            </div>
            
        </div>
    )
}
//<STLview STL={"@/src/scanner.STL"} position={{ x: 0, z: 0, y: 0 }}/>
export default App