import { useState } from "react";
import authService from "../services/authServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "login",
  });

  const handleType = () => {
    setFormData({
      ...formData,
      type: formData.type === "register" ? "login" : "register",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.auth(formData);

      dispatch({
        type: "auth",
        payload: {
          user: data.data,
        },
      });

      navigate("/private");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">
          {formData.type === "login" ? "Login" : "Register"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label text-center">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            {formData.type === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center">
          <small>
            {formData.type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </small>
          <br />
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={handleType}
          >
            Switch to {formData.type === "login" ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;