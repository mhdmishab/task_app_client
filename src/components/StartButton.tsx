import { useNavigate } from 'react-router-dom';
import axios from '../axios/Axios';

interface StartButtonProps {
    onStarted: () => void; 
    
  }

  function generateTime(){
    const currentDate = new Date();


        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const timeString = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        const formattedDateTime = `${day}/${month}/${year}, ${timeString}`;
        return formattedDateTime;
}

function StartButton({ onStarted }: StartButtonProps) {

    const navigate=useNavigate();
  
    const User = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(User.email);
    const handleStart = async () => {
        try {
            if (User && User.email) {
                const startTime = generateTime();
                
                try {
                  const response = await axios.post(`/app-start/${User.email}`, { startTime });
                  console.log(response.data);
                  
                  const currentWeek = response.data.current_week;
                  const updatedUser = { ...User, currentWeek }; 
                  console.log(updatedUser)
                  localStorage.setItem("user", JSON.stringify(updatedUser)); 
                  
                  onStarted();
                  navigate("/")

                } catch (error) {
                  console.error('Error starting application:', error);
                }
              }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        }
    };

    return (
        <div className='w-full flex justify-center mt-20'>
            <div>
                <h2>Hello {User?.name || "buddy"} Welcome</h2>
                <button
                    type="button"
                    onClick={handleStart}
                    className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
                >
                    Lets Start
                </button>
            </div>
        
        </div>
    );
}

export default StartButton;
