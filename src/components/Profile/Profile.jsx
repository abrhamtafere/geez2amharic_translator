import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "********", // Display placeholder for password
  });

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

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // API call to delete the account would go here
      console.log("Account deleted");
      alert("Account deleted successfully!");
    }
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
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
