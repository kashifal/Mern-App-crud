import axios from "axios";
import React, { useState } from "react";
import client from "../axios.config";
const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role:""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formHandler = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:3001/user", form)
      .then((response) => {
        console.log(response.data);
        setError(null);
    setLoading(false);

      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);
        console.error("An error occurred:", error.response.data.error);
      });
  };

  return (
    <div className="h-screen w-screen bg-gray-100 py-28">
      <div className="max-w-lg mx-auto py-10 bg-white rounded-md px-8  border border-gray-100">
        <h1 className="text-2xl text-center font-semibold">Register</h1>
        <div className="mt-5">
          <label htmlFor="" className="block text-md font-semibold">
            User name
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
              setError(null);
            }}
            placeholder="email"
            className="px-2 ring-1 ring-gray-300 w-full py-2 mt-2 rounded-sm bg-white"
            name=""
            id=""
          />
          <h1 className="text-xs text-red-600 font-light mt-1">{error}</h1>
        </div>
        <div className="mt-5">
          <label htmlFor="" className="block  text-md font-semibold">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
              setError(null);
            }}
            placeholder="Password"
            className="px-2 ring-1 ring-gray-300 w-full py-2 mt-2 rounded-sm bg-white"
            name=""
            id=""
          />
        </div>

        <div className="mt-5">
          <label htmlFor="" className="block  text-md font-semibold">
            Your Role
          </label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => {
              setForm({
                ...form,
                role: e.target.value,
              });
              setError(null);
            }}
            placeholder="manager"
            className="px-2 ring-1 ring-gray-300 w-full py-2 mt-2 rounded-sm bg-white"
            name=""
            id=""
          />
        </div>
        <button
          onClick={formHandler}
          className={loading ? 'bg-gray-400 w-full py-3 cursor-progress rounded-sm text-white mt-4' : "bg-indigo-600 w-full py-3 rounded-sm text-white mt-4"}
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default Register;
