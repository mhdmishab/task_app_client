
import NavBar from "../components/NavBar";
import Register from '../components/Register';

function RegisterPage() {
  return (
    <div className="w-full h-full">
            <NavBar />
            <div className="w-full flex justify-center">
                <Register/>
                
            </div>
    </div>
  )
}

export default RegisterPage