import { useState } from "react";
import authService from "../services/authServices";

const AuthForm = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    authService.auth(formData).then((data) => console.log(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="button" role="button" onClick={handleType}>
          change to {formData.type === "register" ? "login" : "register"}
        </button>
        <p>{formData.type}</p>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Send"
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
};

export default AuthForm;
