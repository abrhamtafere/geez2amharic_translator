import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geeztoamharic.onrender.com/api/users/google/success"
        );
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.useremail));
        localStorage.setItem("userPic", data.pic);
        navigate("/"); // Assuming you have a dashboard route
      } catch (error) {
        console.error("Failed to fetch auth data", error);
        navigate("/"); // Redirect to login on failure
      }
    };

    fetchData();
  }, [navigate]);

  return <div>Loading your profile...</div>;
}

export default LoginSuccess;
