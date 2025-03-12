import React from "react";

const SignUp = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-20">
      <div className="card-body">
        <h2 className="text-3xl text-center font-semibold">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <fieldset className="fieldset">
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              required
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            <button className="btn btn-neutral mt-4">Signup</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
