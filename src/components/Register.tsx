
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../axios/Axios';

interface UserType {
  name: string;
  email: string;
}

function Register() {
  const navigate = useNavigate();
  

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'The username must be at least 3 characters.')
      .max(20, 'The username must be at most 20 characters.')
      .required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
  });

  const handleSubmit = async (values: UserType) => {
    const { email, name } = values;
    try {
        const response = await axios.post("/auth/register", { email, name });
        console.log(response.data);
        let hashedOtp = response.data?.hashedOtp || "";
        const data = { email, name, hashedOtp };
        localStorage.setItem("registerData", JSON.stringify(data));
        navigate("/otp");
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

  return (
    <div className='w-full md:w-1/2 lg:w-1/3 mx-auto'>
  <Formik
    initialValues={{ name: '', email: '' }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    <Form className='p-8 px-8 rounded-lg'>
      <h2 className='text-4xl mb-5 dark:text-gray-800 font-bold text-center'>Register</h2>
      <div className='flex flex-col text-black py-2'>
        <label className='text-gray-800'>Name</label>
        <Field
          className='pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black  text-base'
          type='text'
          name='name'
        />
        <ErrorMessage
          name='name'
          component='div'
          className='text-red-500'
        />
      </div>
      <div className='flex flex-col text-black py-2'>
        <label className='text-gray-800'>Email</label>
        <Field
          className='pl-8 m-2 border-b-2 opacity-70 font-display focus:outline-none focus:border-black  text-base'
          type='text'
          name='email'
        />
        <ErrorMessage
          name='email'
          component='div'
          className='text-red-500'
        />
      </div>

      <button className='w-full my-5 py-5 bg-blue-500  px-6  hover:bg-blue-600 text-white font-semibold rounded-lg' type='submit'>
        Register
      </button>
    </Form>
  </Formik>

  
</div>

  );
}

export default Register;
