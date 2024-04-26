
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/register');
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const userToken = localStorage.getItem('token');

  return (
    <div className="bg-black text-white p-5">
      <div className="container mx-auto flex items-center justify-between">
        <span onClick={handleHome}>
          <svg
            fill="none"
            className="h-8 w-8 cursor-pointer"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </span>
        <h1 className="text-xl font-semibold">Task App</h1>
        <div className="flex md:order-2">
          {userToken ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
            >
              Signout
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNavigate}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
