  import React, { useState } from 'react';
  import { FaPlane, FaGlobe, FaMapMarkerAlt, FaBus } from 'react-icons/fa';
  import axios from 'axios';  // Import axios as a namespace
  import { useNavigate ,Link} from 'react-router-dom';
 



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Agree to terms:', agree);
    // Handle the login logic here
    if(!agree) alert("please agree to the terms and conditions")
      
      try {
        const url = 'http://localhost:5000/api/auth/user/login';
        const response = await axios.post(url, {
          email,
          password
        },{ withCredentials: true});
  
        if (response.status === 201) {
          console.log("Valid user");
          navigate('/dashboard');
          // Redirect to dashboard or perform other actions on successful login
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in. Please try again.");
      }
  };

  return (
    <div className='flex items-center h-screen'>
      <div className="flex items-center justify-center w-1/2 h-full bg-black">
        <FaBus className="w-16 h-16 text-white" />
      </div>
      <div className='flex items-center justify-center w-1/2 h-full'>
        <div className="relative flex flex-col items-center p-4 text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <h4 className="font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">
            Login
          </h4>
          <p className="mt-1 font-sans text-base font-normal leading-relaxed text-gray-700">
            Nice to meet you! Enter your login credentials
          </p>
          <form className="max-w-screen-lg mt-8 w-80 sm:w-96" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <label className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Email
                <input
                  type="email"
                  placeholder="name@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full px-3 py-3 text-sm transition-all bg-transparent border rounded-md outline-none peer border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                  aria-label="Email"
                />
              </label>
              <label className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Password
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full px-3 py-3 text-sm transition-all bg-transparent border rounded-md outline-none peer border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                  aria-label="Password"
                />
              </label>
            </div>
            <div className="inline-flex items-center mt-4">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="relative w-5 h-5 transition-all border rounded-md cursor-pointer border-blue-gray-200 checked:border-gray-900 checked:bg-gray-900"
                id="remember"
              />
              <label htmlFor="remember" className="ml-2 font-light text-gray-700 cursor-pointer select-none">
                I agree to the
                <a href="#" className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </a>
              </label>
            </div>
            <button
              className="w-full px-6 py-3 mt-6 text-xs font-bold text-center text-white uppercase transition-all bg-gray-900 rounded-lg shadow-md hover:shadow-lg focus:opacity-85 focus:shadow-none active:opacity-85"
              type="submit"
            >
              Login
            </button>
            <p className="mt-4 text-base text-center text-gray-700">
              Don't have an account?&nbsp;
              
              <Link to='/signup'>
              <a  className="font-medium text-gray-900">
                Signup
              </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
