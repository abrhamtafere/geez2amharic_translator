import { mockHistoryData } from "../../constants/data";


const History = () => {
    // Simulated user ID of the currently logged-in user
    const currentUserId = 'user2';

    

    // Filter the history data to only include entries for the current user
    const userHistory = mockHistoryData.filter(item => item.userId === currentUserId);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Your Translation History</h2>
                <div className="bg-white p-4 rounded shadow">
                    <ul>
                        {userHistory.length > 0 ? userHistory.map((item) => (
                            <li key={item.id} className="border-b border-gray-200 py-2">
                                {item.geezInputs.map((input, index) => (
                                    <span key={index} className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        {input}
                                    </span>
                                ))}
                            </li>
                        )) : <li className="text-center text-gray-500">No history found.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default History;
