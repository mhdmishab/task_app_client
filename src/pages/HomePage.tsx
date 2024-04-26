import  { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import StartButton from '../components/StartButton';
import WeekTasks from '../components/WeekTasks';
import axios from '../axios/Axios';


function HomePage() {
  
  const User = JSON.parse(localStorage.getItem('user') || '{}');
  console.log(User.email)

  const [started, setStarted] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(User.currentWeek);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/current-week/${User.email}`);
        console.log(response.data);
        setCurrentWeek(response.data.currentWeek);
      } catch (error) {
        console.error('Error fetching week data:', error);
      }
    };
  
    fetchData();
  }, [User.email,started]);

  const handleStarted = () => {
    setStarted(true);
  };

  return (
    <div className='w-full h-full'>

      <NavBar />

      {
        currentWeek !== null && currentWeek > 5 ? (
          <div className='w-full flex items-center justify-center'>
            <div className='w-full max-w-md p-4'>
              <h1>Congratulation you completed All week tasks</h1>
              <button
                type="button"
                className={`mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full  md:w-auto 
                        }`}
              >
                You are Superb
              </button>
            </div>
          </div>
        ) : (
   
          (!currentWeek && !started ) ? (
            <StartButton onStarted={handleStarted} />
            
           
          ) :  (
      
            <WeekTasks email={User.email} currentWeek={currentWeek} />
          )
        )
      }

    </div>
  )
}

export default HomePage