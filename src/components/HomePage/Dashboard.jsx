import { useState, useEffect } from "react";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [otherData, setOtherData] = useState(null); // Placeholder for additional data

  // Function to fetch the total number of users
  const fetchTotalUsers = async () => {
    // Replace this with your actual API call or data fetching logic
    const response = await fetch("/api/totalUsers");
    const data = await response.json();
    setTotalUsers(data.totalUsers);
  };

  // Function to fetch other relevant data
  const fetchOtherData = async () => {
    // Replace this with your actual API call or data fetching logic
    const response = await fetch("/api/otherData");
    const data = await response.json();
    setOtherData(data);
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchOtherData();
  }, []);

  return (
    <div className="container mx-auto py-8 h-[100vh]">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="flex flex-col space-y-4">
        <div className="mt-8 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-lg">{totalUsers}</p>
        </div>
        <div className="mt-8 p-4 border border-gray-300 rounded-md hidden">
          <h2 className="text-xl font-semibold mb-2">Other Data</h2>
          {otherData ? (
            <div>
              {/* Render your other data here */}
              <p className="text-lg">Some other data: {otherData.someValue}</p>
              {/* Add more fields as necessary */}
            </div>
          ) : (
            <p className="text-lg">Loading...</p>
          )}
        </div>
        <div className="mt-8 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold mb-2">About Geez and Amharic</h2>
          <p className="text-lg mb-2">
            <strong>Geez:</strong> Geez, also known as Ge&apos;ez, is an ancient
            South Semitic language that originated in Eritrea and the northern
            region of Ethiopia in the Horn of Africa. It was historically used
            as a liturgical language of the Ethiopian Orthodox Tewahedo Church,
            the Eritrean Orthodox Tewahedo Church, and the Beta Israel Jewish
            community.
          </p>
          <p className="text-lg mb-2">
            <strong>Amharic:</strong> Amharic is a Semitic language spoken in
            Ethiopia. It is the second-most spoken Semitic language in the world
            after Arabic and serves as the official working language of
            Ethiopia. It is used in government, the military, and the Ethiopian
            Orthodox Tewahedo Church.
          </p>
          <p className="text-lg">
            <strong>Translation Usage:</strong> Translating between Geez and
            Amharic is essential for understanding ancient religious texts and
            historical documents. Geez is primarily used in religious contexts,
            while Amharic is used in everyday communication and administration
            in Ethiopia. Understanding the nuances of both languages is crucial
            for scholars, historians, and members of the religious community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
