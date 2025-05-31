import React from "react";

const Login = () => {
  return (
    <div  >
      <h1>Login</h1>
      <form>
        <div  >
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div  >
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <div  >
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div  >
          <span href="/forgot-password"  >
            Forgot Password?
          </span>
        </div>
        <button type="submit"  >
          Login
        </button>
        <div>
        <span>New Hare? <Link to=''></Link></span>
        </div>
      </form>
    </div>
  );
};

export default Login;
