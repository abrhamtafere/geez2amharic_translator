import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteUserMutation,
  usePasswordChangeMutation,
} from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
} from "@mui/material";
import { BiShow, BiHide } from "react-icons/bi";
import { useGetFavoritesQuery } from "../../redux/api/authApiSlice";

function Profile() {
  const { user, email, user_id } = useSelector((state) => state.auth);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [passwordChange, { isLoading: isChangingPassword }] =
    usePasswordChangeMutation();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user || "John Doe",
    email: email || "john.doe@example.com",
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { data: favorites, isLoading } = useGetFavoritesQuery(user_id);

  if (isLoading) {
    return (
      <div className="">
        <LinearProgress />
      </div>
    );
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteUser = async () => {
    try {
      if (favorites.length !== 0) {
        toast.error("First clear all your favorites");
        handleCloseModal();
        return;
      }
      const res = await deleteUser(user_id).unwrap();
      console.log("res: ", res);
      toast.success("User deleted successfully");
      navigate("/logout");
      handleCloseModal();
    } catch (err) {
      toast.error("Failed to delete the user");
      handleCloseModal();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = async () => {
    try {
      const data = {
        id: user_id,
        oldpassword: profile.oldPassword,
        newpassword: profile.newPassword,
      };
      const response = await passwordChange(data).unwrap();

      if (response.success) {
        toast.success(response.message);
        setProfile((prevState) => ({
          ...prevState,
          oldPassword: "",
          newPassword: "",
        }));
      } else {
        toast.error("Password change failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to change password");
    }
  };

  const handleSaveChanges = () => {
    handlePasswordChange();
    console.log("Profile updated:", profile);
  };

  const toggleShowOldPassword = () => {
    setShowOldPassword((prevShowOldPassword) => !prevShowOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold pb-4">Edit Profile</h4>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            readOnly
            placeholder="Name"
            value={profile.name}
            onChange={handleInputChange}
            className="input  input input-bordered p-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full rounded"
          />
          <input
            type="email"
            name="email"
            readOnly
            placeholder="Email"
            value={profile.email}
            onChange={handleInputChange}
            className="input  input input-bordered p-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full rounded"
          />

          <div className="relative">
            <label htmlFor="" className="text-sm italic text-gray-600">
              you can change your password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              value={profile.oldPassword}
              onChange={handleInputChange}
              className="border input input-bordered p-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full rounded"
            />

            <div
              className="absolute inset-y-0 right-2 flex items-center top-6"
              onClick={toggleShowOldPassword}
            >
              {showOldPassword ? <BiHide /> : <BiShow />}
            </div>
          </div>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={profile.newPassword}
              onChange={handleInputChange}
              className="border input input-bordered p-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full rounded"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={toggleShowNewPassword}
            >
              {showNewPassword ? <BiHide /> : <BiShow />}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            className={`btn btn-primary text-white bg-blue-500 hover:bg-blue-600 p-2 rounded ${
              isChangingPassword ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSaveChanges}
            disabled={isChangingPassword}
          >
            {isChangingPassword ? "Changing Password..." : "Save Changes"}
          </button>
          <button
            className={`btn btn-error text-white bg-red-500 hover:bg-red-600 p-2 rounded ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleOpenModal}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting Account..." : "Delete Account"}
          </button>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this account?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteUser(user_id)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
