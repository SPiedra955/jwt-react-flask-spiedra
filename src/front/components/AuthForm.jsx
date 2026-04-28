import { useState } from "react";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
  });

  return (
    <form>
      <p>{formData.type}</p>
    </form>
  );
};
