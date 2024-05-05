import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

function HomePage() {
  const [geezText, setGeezText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [file, setFile] = useState(null);

  const handleTranslate = () => {
    // Simulate a translation process
    setTranslatedText("Translated version of: " + geezText);
    // Here, integrate your actual translation API or logic
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      // Optionally, you can set up file reading here if needed, e.g., for displaying file content or immediate processing
      console.log("File uploaded:", file.name);
      // Additional logic to handle the file upload to a server or file processing can go here
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    // Implement the logic to handle file translation here
    console.log("Prepare to translate file:", file.name);
    alert("File ready for translation: " + file.name);
    // Resetting the file state if needed
    setFile(null);
  };

  return (
    <div className="flex sitems-center justify-center container mx-auto px-4 min-h-[65vh] mb-16">
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
          <button
            className=" hidden md:flex bg-light-blue-500 hover:bg-light-blue-700 text-white text-xl font-bold py-2 px-8 rounded sw-1/2"
            onClick={handleTranslate}
          >
            Translate
          </button>
        </div>

        {/*  */}
        <div className="flex justify-between itmes-center bg-light-blue-500 px-2 py-2 text-white rounded-sm text-xl">
          <span
            htmlFor=""
            className=" "
          >
            ግዕዝ | Geez
          </span>
          <span
            htmlFor=""
            className=" "
          >
            Translate files
          </span>
          <span
            htmlFor=""
            className=" "
          >
            አማርኛ | Amharic
          </span>
        </div>
        <div className="flex items-center justify-center mb-8">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,image/*"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Upload File
          </label>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={handleFileUpload}
          >
            Translate File
          </button>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default HomePage;
