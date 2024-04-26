import React, { useEffect, useState } from 'react';
import axios from '../axios/Axios';
import { useNavigate } from 'react-router-dom';

interface Task {
    done: boolean;
    done_time: string | null;
}

interface Tasks {
    [taskId: string]: Task;
}

interface WeekTasksProps {
    email: string;
    currentWeek: number;
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

function WeekTasks({ email, currentWeek }: WeekTasksProps) {
    const [weekData, setWeekData] = useState<{
        week: { completion_time: string | null; completed: boolean };
        tasks: Tasks;
    } | null>(null);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/week/${email}/${currentWeek}`);
                setWeekData(response.data.weekData);
            } catch (error) {
                console.error('Error fetching week data:', error);
            }
        };

        fetchData();
    }, [email, currentWeek]);

    const handleCheckboxChange = (taskId: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!weekData) return;
        const updatedTasks = { ...weekData.tasks };
        updatedTasks[taskId].done = event.target.checked;

        const done_time= generateTime()

        updatedTasks[taskId].done_time = event.target.checked ? done_time : null;

        setWeekData({ ...weekData, tasks: updatedTasks });
    };

    const areAllTasksCompleted = () => {
        if (!weekData) return false;
        return Object.values(weekData.tasks).every(task => task.done);
    };

    const handleCompleteWeek = async() => {
        if (areAllTasksCompleted()) {
            console.log("Week completed!");
            const time=generateTime();
            if(weekData){
                const weekEndTime= time;
                const updatedTasks=weekData.tasks;

                const response = await axios.post(`/week/${email}/${currentWeek}`,{weekEndTime,updatedTasks});
                console.log(response);
                if (response) {
                    const User = JSON.parse(localStorage.getItem('user') || '{}');
                    const currentWeek = response.data.currentWeek;
                    const updatedUser = { ...User, currentWeek }; 
                    localStorage.setItem("user", JSON.stringify(updatedUser)); 
                    navigate('/week-completed');
                  }
            }else{
                console.log("WeekData missing")
            }
        } else {
            console.log("All tasks must be completed to complete the week!");
        }
    };

    if (!weekData) {
        return <div className='w-full flex justify-center mt-4'>Loading...</div>; 
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className='w-full'>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Week
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Task Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Done
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Done Time
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          
                            {Object.entries<Task>(weekData.tasks).map(([taskId, task]) => (
                                <tr key={taskId} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">{currentWeek}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{taskId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={task.done}
                                            onChange={handleCheckboxChange(taskId)}
                                            className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {task.done_time || 'Not done'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='w-full flex justify-center'>
                    <button
                        type="button"
                        onClick={handleCompleteWeek}
                        disabled={!areAllTasksCompleted()}
                        className={`mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto ${
                            !areAllTasksCompleted() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Complete Week
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WeekTasks;
