import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useGetFavoritesQuery,
  useSaveFavoriteMutation,
  useUploadFileMutation,
} from "../../redux/api/authApiSlice";
import { LinearProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function HomePage() {
  const [geezText, setGeezText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const { user, user_id } = useSelector((state) => state.auth);
  const [favoriteState, setFavoriteState] = useState(false);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [uploadFile, { isLoading, isError }] = useUploadFileMutation();
  const [saveFavorite, { isFavoriteLoading, isFavoriteError }] =
    useSaveFavoriteMutation();
  const { data: existingTranslations = [], isLoading: isGetFavoritesLoading } =
    useGetFavoritesQuery(user_id);
  console.log("user id: ", user_id);

  if (isLoading || isGetFavoritesLoading || isFavoriteLoading) {
    return (
      <div>
        <span className="pl-4 text-center w-full p-2">Loading...</span>
        <LinearProgress />
      </div>
    );
  }

  if (isError || isFavoriteError) {
    return (
      <div>Error: {isError ? "Uploading file" : "Saving translation"}</div>
    );
  }

  const translateSentence = async (paragraph) => {
    try {
      setLoadingTranslate(true);
      const response = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paragraph: paragraph }),
      });
      console.log("res: ", response);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      return data.translation; // Adjusted based on Postman response
    } catch (error) {
      console.error("Error:", error);
      return <p className="text-gray-600">Translation failed</p>;
    }
    // finally {
    //   // setLoadingTranslate(false);
    // }
  };

  const handleTranslate = async () => {
    // Simulate a translation process
    if (geezText) {
      const translation = await translateSentence(geezText);
      setTranslatedText(translation);
      // setTranslatedText("Translated version of: " + geezText);
      setFavoriteState(false); // to refresh the save
    } else {
      setTranslatedText("please first enter the geez text");
    }
    setLoadingTranslate(false);
    // Here, integrate your actual translation API or logic
  };

  const handleFileChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file) {
      console.log("file is: ", file);

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log("FormData:", formData);

      try {
        const response = await uploadFile(formData).unwrap();
        // Handle successful response
        console.log("Success:", response);

        // Extract processed text from the response and set it as geezText
        const processedText = response.processed_text.join("\n");
        setGeezText(processedText);
        // toast.success("File uploaded and processed successfully!");
      } catch (error) {
        // Handle error
        console.error("Error:", error);
        toast.error("Error uploading file. Please try again.");
      }
    }
  };

  const saveFavoriteTranslation = async () => {
    const data = {
      user_id: user_id, // Replace with actual user ID
      geez: geezText, //"Geez text here",
      amharic: translatedText, //"Amharic text here",
    };

    // Check if the translation already exists for the user getFavorites retrieves the user's favorite translations
    const isDuplicate = existingTranslations.some((translation) => {
      return (
        translation.geez === data.geez && translation.amharic === data.amharic
      );
    });

    if (isDuplicate) {
      // Translation already exists, notify user
      toast.info("Translation already saved");
      return;
    }

    if (favoriteState) {
      toast.info("There is no new Translated text!");
      return;
    }

    try {
      const res = await saveFavorite(data).unwrap();
      if (res) {
        console.log("favorite: ", res);
        toast.success("Translation saved successfully");
        setFavoriteState(true);
      } else {
        throw new Error("Failed to save translation");
      }
    } catch (error) {
      console.error("Error saving translation:", error);
      toast.error("Error saving translation ");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className=" flex sitems-center justify-center container mx-auto px-4 min-h-[65vh] ">
        <div className="flex flex-col space-y-4 flex-grow gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex flex-col flex-grow shadow-md">
              <span className="bg-light-blue-500 px-2 py-2 text-white rounded-sm text-xl">
                ግዕዝ | Geez
              </span>

              <textarea
                className="p-2 border rounded-md text-lg outline-amber-400 "
                placeholder="Enter Geez text here..."
                value={geezText}
                onChange={(e) => {
                  setGeezText(e.target.value);
                  // setFavoriteState(false);
                }}
                rows="6"
              ></textarea>
            </div>

            <button
              className={` md:hidden bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded ${
                loadingTranslate
                  ? "bg-gray-500 hover:bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleTranslate}
            >
              Translate
            </button>
            <div className="flex flex-col gap-2">
              <FaAngleDoubleRight className="hidden md:flex text-primary-dark size-6" />
              {user && (
                <div className="">
                  {favoriteState ? (
                    <FaHeart className="hidden md:flex text-green-500 size-6" />
                  ) : (
                    <FaRegHeart className="hidden md:flex text-red-700 size-6" />
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col flex-grow shadow-md">
              <span
                htmlFor=""
                className="bg-light-blue-500 px-2 py-2 text-white rounded-sm text-xl "
              >
                አማርኛ | Amharic
              </span>
              <textarea
                className="p-2 border rounded-md w-full text-lg outline-amber-400"
                placeholder="Translated Amharic text will appear here..."
                value={translatedText}
                readOnly
                rows="6"
              ></textarea>
            </div>
          </div>
          <div className="flex dflex-col gap-2 lg:flex-row items-center justify-center ">
            <div className="flex items-center justify-center xmb-8 mx-4">
              <input
                name="file"
                type="file"
                onChange={handleFileChange}
                accept="image/*" //accept=".pdf,.doc,.docx,image/*"
                className="hidden"
                id="file-upload"
              />
              {user && (
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded ml-4"
                >
                  <FaCloudUploadAlt className="size-6" /> Upload File
                </label>
              )}
            </div>
            <button
              className={` hidden md:flex text-white text-xl font-bold py-2 px-8 rounded sw-1/2 ${
                loadingTranslate
                  ? "bg-gray-500 hover:bg-gray-500"
                  : "bg-light-blue-500 hover:bg-light-blue-700"
              }`}
              onClick={handleTranslate}
              disabled={loadingTranslate}
            >
              Translate
            </button>
            {/* favotites */}
            {user && (
              <button
                className="xhidden md:flex bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-2 px-8 rounded flex items-center space-x-2 ml-4"
                onClick={saveFavoriteTranslation}
              >
                {user && (
                  <div className="flex items-center">
                    {favoriteState ? (
                      <FaHeart className="hidden md:flex text-green-600 size-5" />
                    ) : (
                      <FaRegHeart className="hidden md:flex text-red-700 size-5" />
                    )}
                  </div>
                )}
                <span>Save Favorite</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
