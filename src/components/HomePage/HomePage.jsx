import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useUploadFileMutation } from "../../redux/api/authApiSlice";
import { LinearProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

function HomePage() {
  const [geezText, setGeezText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const user = useSelector((state) => state.auth.user);
  // const [file, setFile] = useState(null);
  const [uploadFile, { isLoading, isError }] = useUploadFileMutation();

  if (isLoading) {
    return (
      <div>
        <span className="pl-4 text-center w-full p-2">
          File is uploading...{" "}
        </span>
        <LinearProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Error uploading file</div>;
  }
  const handleTranslate = () => {
    // Simulate a translation process
    setTranslatedText("Translated version of: " + geezText);
    // Here, integrate your actual translation API or logic
  };

  const handleFileChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file) {
      console.log("file is: ", file);

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
      } catch (error) {
        // Handle error
        console.error("Error:", error);
      }
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
                className="p-2 border rounded-md text-lg outline-amber-400"
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
                className="p-2 border rounded-md w-full text-lg outline-amber-400"
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
                  <FaCloudUploadAlt className='size-6'/> Upload File
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
        </div>
      </div>
    </div>
  );
}

export default HomePage;
