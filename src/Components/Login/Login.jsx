import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [errorList, seterrorList] = useState([]);

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function sendUserDataToApi() {
    let { data } = await Axios.post(`https://route-movies-api.vercel.app/signin`, user);

    if (data.message === "success") {
      setLoading(false);
      localStorage.setItem('userToken', data.token)
      navigate('/home');
    } else {
      setLoading(false);
      setError(data.message);
    }
  }

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setLoading(true);

    let validation = validateLoginForm();
    if (validation.error) {
      seterrorList(validation.error.details);
    } else {
      sendUserDataToApi();
    }
  }

  function validateLoginForm() {
    let scheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
    });

    return scheme.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 mx-auto py-3">
        <h3 className="my-4">Login Form</h3>

        {error ? <p className="text-danger">{error}</p> : ""}

        <form onSubmit={submitLoginForm}>

          <label htmlFor="email">email :</label>
          <input
            onChange={getUserData}
            type="email"
            className="form-control my-input my-2"
            name="email"
            id="email"
          />

          <p className="text-danger">
            {
              errorList.filter((error) => error.context.label === "email")[0]
                ?.message
            }
          </p>

          <label htmlFor="password">password :</label>
          <input
            onChange={getUserData}
            type="password"
            className="form-control my-input my-2"
            name="password"
            id="password"
          />

          <p className="text-danger">
            {
              errorList.filter((error) => error.context.label === "password")[0]
                ? "Incorrect Password..." : ""
            }
          </p>
        

          <button type="submit" className="btn btn-info my-2 text-white">
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

