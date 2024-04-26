import { useGoogleLogin } from '@react-oauth/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from '../axios/Axios';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const navigate=useNavigate();
  
  const onGoogleLoginSuccess = (data: any) => {
    console.log(data.access_token);
    const code = data.access_token;

    // Send POST request to server
    axios.post("/auth/google", { code })
      .then(response => {
        // Handle response from server if needed
        console.log(response.data);
        const { token, user } = response.data;
        if (token && user) {
          localStorage.clear();
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate('/');
        }
      })
      .catch(error => {
        // Handle error
        console.error("Error occurred while sending POST request:", error);
      });
  };

  const onGoogleLoginError = () => {
    console.log("Error occurred during login");
  };

  const login = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    onError: onGoogleLoginError,
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => login()}
        className="w-full md:w-96 button-entrar p-3 py-2 bg-blue-400 hover:bg-blue-700 rounded-md text-white focus:outline-none font-bold"
      >
        <FontAwesomeIcon icon={faGoogle} className="text-white mr-2" />
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginComponent;
