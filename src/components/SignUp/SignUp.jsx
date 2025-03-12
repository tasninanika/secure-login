import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email);
    console.log(password);

    // reset error and status
    setError("");
    setSuccess(false);

    if (password.length < 6) {
      setError("Password should be 6 characters");
      return;
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      setError("At least one uppercase, one lower case, one special character");
    }

    // create user with email and pass
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("Error", error);
        setError(error.message);
        setSuccess(false);
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
            <div className="relative">
              <label className="fieldset-label">Password</label>
              <input
                type={showPass ? "text" : "password"}
                className="input w-full pr-10"
                name="password"
                placeholder="Password"
                required
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute bottom-3.5 right-3 flex items-center"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <fieldset className="fieldset w-64">
              <label className="fieldset-label">
                <input type="checkbox" defaultChecked className="checkbox" />
                Accepts Our Terms & Conditions
              </label>
            </fieldset>

            <button className="btn btn-neutral mt-4">Signup</button>
          </fieldset>
        </form>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {success && <p className="text-green-600">Sign up is successful</p>}
      </div>
    </div>
  );
};

export default SignUp;
