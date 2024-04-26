
import {  useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../axios/Axios';
import { message } from 'antd';

interface UserType {
    email: string;
}

function Login() {
    const navigate = useNavigate();

    const user = {
        email: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('This is not a valid email.')
            .required('This field is required!'),

    });

    const handleSubmit = async (values: UserType) => {
        console.log(values.email);
        const email = values.email

        const response = await axios.post("/auth/login", { email });
        console.log(response.data);
        const { token, user } = response.data;
        if (token && user) {
            localStorage.clear();
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/');
        } else {
            message.error(response.data.message)
        }

    };

    return (
        <div className='w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto'>
            <Formik
                initialValues={user}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='p-8 px-8 rounded-lg'>
                    <h2 className='text-4xl dark:text-gray-800 font-bold text-center m-4'>Login</h2>
                    <div className='flex flex-col py-2'>
                        <label className='text-gray-800'>Email</label>
                        <Field
                            className="pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black text-base"
                            type='text'
                            name='email'
                        />
                        <ErrorMessage
                            name='email'
                            component='div'
                            className='text-red-500'
                        />
                    </div>
                    <button className='w-full my-5 py-5 bg-blue-500 px-6 hover:bg-blue-600 text-white font-semibold rounded-lg' type='submit'>
                        Login
                    </button>
                </Form>
            </Formik>
        </div>

    )
}

export default Login