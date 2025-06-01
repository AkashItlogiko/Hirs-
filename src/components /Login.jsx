 import React from 'react';
 
 const Login = () => {
    return (
        <div>
             <div className='bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filer backdrop-blur-lg bg-opacity-30 relative'>
                <h1 className='text-4xl font-bold text-center mb-6'>Login</h1>
                <form action="">
                  <div className='relative my-4'>
                   <input type="text" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus-border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' placeholder=''  />
                     <label htmlFor=""className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6'>Username</label> 
                 </div>  

                  <div className='relative my-4'>
                   <input type="password" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus-border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' placeholder=''  />
                     <label htmlFor=""className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label> 
                 </div>
                 <button type='submit' className='w-full mb-4 text-[18px] mt-6 rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300'>Login</button>  
                </form>
             </div>
        </div>
    );
 };
 
 export default Login;