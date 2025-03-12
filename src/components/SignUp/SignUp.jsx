import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";

const SignUp = () => {
  const [errorMessage, setError] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email);
    console.log(password);

    // reset error and status
    setError("");

    // create user with email and pass
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log("Error", error);
        setError(error.message);
      });
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
              name="email"
              placeholder="Email"
              required
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Password"
              required
            />
            <button className="btn btn-neutral mt-4">Signup</button>
          </fieldset>
        </form>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignUp;
