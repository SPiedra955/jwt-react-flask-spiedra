const authService = {};
const url = import.meta.env.VITE_BACKEND_URL;

authService.auth = async (formData) => {
  try {
    const resp = await fetch(url + "/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw new Error("error auth");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default authService;
