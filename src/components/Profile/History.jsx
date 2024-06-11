import { useSelector } from "react-redux";
import {
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from "../../redux/api/authApiSlice";
import Favorite from "./Favorite";
import { LinearProgress } from "@mui/material";
import { toast } from "react-toastify";

const History = () => {
  // Simulated user ID of the currently logged-in user
  const { user_id: id } = useSelector((state) => state.auth);
  const { data: favorites = [], isLoading } = useGetFavoritesQuery(id); // Default to an empty array
  const [deleteFavorite, { isDeleteLoading }] = useDeleteFavoriteMutation();

  if (isLoading) {
    return (
      <div className="">
        <LinearProgress />
      </div>
    );
  }
  console.log("favo: ", favorites);

  const handleDelete = async ({ user_id, text_id }) => {
    try {
      console.log("tibsua: ", user_id, " and ", text_id);
      const res = await deleteFavorite({
        user_id,
        text_id,
      }).unwrap();
      // Optionally, you can add a success message or update the UI
      toast.success(res.message);
    } catch (error) {
      // Handle error
      console.error("Error deleting favorite:", error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div
          className="p-4 w-full rounded-t"
          style={{
            backgroundImage: 'url("/images/favorite.webp")',
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-white border-b-2 border-gray-300 pb-2 text-center pt-4 ">
            Your Translation Favorites ({favorites.length})
          </h2>
        </div>

        {/* here is favorites */}
        <div className="">
          <div className="bg-white p-4 rounded shadow">
            <ul>
              {favorites.length > 0 ? (
                favorites.map((item) => (
                  <li key={item.id} className="border-b border-gray-200 py-2">
                    <Favorite
                      user_id={item.user_id}
                      text_id={item.id}
                      geezText={item.geez}
                      amharicText={item.amharic}
                      onDelete={handleDelete}
                      isLoading={isDeleteLoading}
                    />
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">No favorite found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
