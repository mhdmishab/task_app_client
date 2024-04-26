import  { useState } from 'react';
import { InputOTP } from 'antd-input-otp';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/Axios';
import { message } from 'antd';

function OtpPage() {
    const navigate = useNavigate();
    const [value, setValue] = useState<string[]>([]);

    const handleFinish = async (otp: string[]) => {
        const payload = otp || value;
        const dataString = localStorage.getItem("registerData") || "";
        const data = JSON.parse(dataString);
        const { name, email, hashedOtp } = data;
        const newOtp = payload.join('');
        try {
            const response = await axios.post("/auth/verify-otp", { name, email, hashedOtp, newOtp });
            console.log(response.data);
            const { token, user } = response.data;
            if (token && user) {
                localStorage.clear();
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate('/');
            } else {
                message.error(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-4xl dark:text-gray-800 font-bold text-center m-4">Verify OTP</h2>
            <div className="w-full max-w-lg">
                <InputOTP onChange={setValue} value={value} autoSubmit={handleFinish} length={4} inputType='numeric' />
            </div>
        </div>
    );
}

export default OtpPage;
