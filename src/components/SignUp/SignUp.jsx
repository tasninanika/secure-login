import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    console.log(email);
    console.log(password, terms, photo, name);

    // reset error and status
    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Please accept our terms and conditions");
      return;
    }

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

        //   send verification email
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification email sent");
        });

        // update profile name and photo
        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("user profile updated");
          })
          .catch(() => console.log("user profile update error"));
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
            <label className="fieldset-label">Name</label>
            <input
              type="text"
              className="input"
              name="text"
              placeholder="Write your name"
              required
            />
            <label className="fieldset-label">Photo URL</label>
            <input
              type="text"
              className="input"
              name="photo"
              placeholder="url"
              required
            />
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
                <input
                  type="checkbox"
                  name="terms"
                  defaultChecked
                  className="checkbox"
                />
                Accepts Our Terms & Conditions
              </label>
            </fieldset>

            <button className="btn btn-neutral mt-4">Signup</button>
          </fieldset>
          <p className="text-center mt-3">
            <Link to="/login" className="link link-hover">
              Create an account
            </Link>
          </p>
        </form>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {success && <p className="text-green-600">Sign up is successful</p>}
      </div>
    </div>
  );
};

export default SignUp;
