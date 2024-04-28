import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/slice/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(logout());
    navigate("/");

  }, []);

  return null;
};

export default Logout;