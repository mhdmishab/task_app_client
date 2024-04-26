import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginComponent from "../components/LoginComponent";
import NavBar from "../components/NavBar";
import Login from "../components/Login";



function LoginPage() {
    // const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <div className="w-full h-full">
            <NavBar />

            <div className="w-full flex justify-center">
                <Login/>
                
            </div>
            <div className="flex justify-center ">
                
                <GoogleOAuthProvider clientId="20961684295-6fq254nf69heap1qc2hukg64jllkdtfi.apps.googleusercontent.com">
       

                    <LoginComponent />
                </GoogleOAuthProvider>
            </div>
        </div>

    );
}

export default LoginPage;
