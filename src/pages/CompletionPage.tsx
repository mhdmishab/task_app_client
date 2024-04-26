
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function CompletionPage() {
    const navigate = useNavigate();
    
    const handleNextWeek = () => {
        navigate('/');
    };
    
    return (
        <div>
            <NavBar/>
        <div className='w-full h-96 flex items-center justify-center'>
            <div className='w-full max-w-md p-4'>
                <h1 className='text-center'>Congratulations! You completed this week's tasks</h1>
                <button
                    type="button"
                    onClick={handleNextWeek}
                    className='m-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto'
                >
                    Go to Next Week
                </button>
            </div>
        </div>
        </div>
    );
}

export default CompletionPage;
