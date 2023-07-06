import Navbar from '@/src/components/Navigation/Navbar'
import STLview from '../src/components/STLViewer'

function App() {
    return(
        <div className="flex flex-col items-center justify-center">
            <Navbar />
            <h1>Hello from three!</h1>
        </div>
    )
}
//<STLview STL={"@/src/scanner.STL"} position={{ x: 0, z: 0, y: 0 }}/>
export default App