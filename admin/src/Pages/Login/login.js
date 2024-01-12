import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { postDataAPIAdmin } from "../../ultils";
//import Logo from "../images/instagram_logo_lrg.png";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const navigate = useNavigate();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await postDataAPIAdmin("loginAdmin", userData);
    if (login.status === 200 && login.data.user.role === "admin") {
      localStorage.setItem("firstLogin", true);
      navigate("/dashboard");
    } else {
      alert("User can not login admin page");
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">ADMIN</h3>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address: </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password: </label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>

        <p className="my-2">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
