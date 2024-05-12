import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

function HomePage() {
  const [geezText, setGeezText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  // const [file, setFile] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleTranslate = () => {
    // Simulate a translation process
    setTranslatedText("Translated version of: " + geezText);
    // Here, integrate your actual translation API or logic
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      uploadFile(file); // Immediately upload the file after selection
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);


    const url = "https://geeztoamharic.onrender.com/api/users/ocr";

    try {
      // Use Axios to send a POST request
      // const response = await axios.post(url, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      console.log('form data is: ', formData)
      const response = await axios.post(url, file);

      // Log and handle the response data
      const data = response.data;
      console.log("Success:", data);

      if (data.processed_text && data.processed_text.length > 0) {
        setGeezText(data.processed_text.join(" "));
      } else {
        console.error("No processed text found");
        alert("No processed text found");
      }
    } catch (error) {
      // Handle errors
      console.error("Error processing file:", error);
      alert(
        "Error processing file: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
<div className="">
    <div className=" flex sitems-center justify-center container mx-auto px-4 min-h-[65vh] mb-16 ">
      <div className="flex flex-col space-y-4 flex-grow gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col flex-grow shadow-md">
            <span className="bg-light-blue-500 px-2 py-2 text-white rounded-sm text-xl">
              ግዕዝ | Geez 
            </span>

            <textarea
              className="p-2 border rounded-md text-lg"
              placeholder="Enter Geez text here..."
              value={geezText}
              onChange={(e) => setGeezText(e.target.value)}
              rows="6"
            ></textarea>
          </div>

          <button
            className=" md:hidden bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded"
            onClick={handleTranslate}
          >
            Translate
          </button>
          <FaAngleDoubleRight className="hidden md:flex text-blue-700 size-6" />
          <div className="flex flex-col flex-grow shadow-md">
            <span
              htmlFor=""
              className="bg-light-blue-500 px-2 py-2 text-white rounded-sm text-xl "
            >
              አማርኛ | Amharic
            </span>
            <textarea
              className="p-2 border rounded-md w-full text-lg"
              placeholder="Translated Amharic text will appear here..."
              value={translatedText}
              readOnly
              rows="6"
            ></textarea>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center xmb-8 mx-4">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,image/*"
              className="hidden"
              id="file-upload"
            />
            {user && (
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded ml-4"
              >
                Upload File
              </label>
            )}
          </div>
          <button
            className=" hidden md:flex bg-light-blue-500 hover:bg-light-blue-700 text-white text-xl font-bold py-2 px-8 rounded sw-1/2"
            onClick={handleTranslate}
          >
            Translate
          </button>
        </div>

        {/*  */}

        {/*  */}
      </div>
    </div>
    </div>
  );
}

export default HomePage;
