import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [errorList, seterrorList] = useState([]);

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function sendUserDataToApi() {
    let { data } = await Axios.post( `https://route-movies-api.vercel.app/signup`, user );
    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
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

  function submitRegisterForm(e) {
    e.preventDefault();
    setLoading(true);

    let validation = validateRegisterForm();
    if (validation.error) {
      seterrorList(validation.error.details);
    } else {
      setLoading(false);
      sendUserDataToApi();
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,8}/),
    });

    return scheme.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 mx-auto py-3">
        <h3 className="my-4">Registeration Form</h3>

        {error ? <p className="text-danger">{error}</p> : ""}

        {errorList.map((error, index) => {
          if (error.context.label === "password") {
            return (
              <p key={index} className="text-danger">
                Invalid Password...
              </p>
            );
          } else {
            return (
              <p key={index} className="text-danger">
                {error.message}
              </p>
            );
          }
        })}

        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">first_name :</label>
          <input
            onChange={getUserData}
            type="text"
            className="form-control my-input my-2"
            name="first_name"
            id="first_name"
          />
         
          <label htmlFor="last_name">last_name :</label>
          <input
            onChange={getUserData}
            type="text"
            className="form-control my-input my-2"
            name="last_name"
            id="last_name"
          />

          <label htmlFor="age">age :</label>
          <input
            onChange={getUserData}
            type="number"
            className="form-control my-input my-2"
            name="age"
            id="age"
          />

          <label htmlFor="email">email :</label>
          <input
            onChange={getUserData}
            type="email"
            className="form-control my-input my-2"
            name="email"
            id="email"
          />

          <label htmlFor="password">password :</label>
          <input
            onChange={getUserData}
            type="password"
            className="form-control my-input my-2"
            name="password"
            id="password"
          />

          <button type="submit" className="btn btn-info my-2 text-white">
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
