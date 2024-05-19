import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteUserMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, user_id } = useSelector((state) => state.auth);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [profile, setProfile] = useState({
    name: user || "John Doe",
    email: "john.doe@example.com",
    password: "********", // Display placeholder for password
  });

  const handleDeleteUser = async (userId) => {
    try {
      console.log("id: ", user_id, userId);
      const res = await deleteUser(user_id).unwrap();
      console.log("User deleted successfully", res);
      toast.success("User deleted successfully");
      navigate("/logout");
      handleCloseModal();
    } catch (err) {
      console.error("Failed to delete the user: ", err);
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

  const handleSaveChanges = () => {
    // API call to update the profile would go here
    console.log("Profile updated:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold pb-4">Edit Profile</h4>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={profile.password}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            className="btn btn-primary  text-white  bg-blue-500 hover:bg-blue-600 p-2 rounded"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            className="btn btn-error text-white  bg-red-500 hover:bg-red-600 p-2 rounded"
            onClick={handleOpenModal}
            disabled={isLoading}
          >
            {isLoading ? "Deleting Account ..." : "Delete Account"}
          </button>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this favorite?
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
