import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

function HomePage() {
  const [geezText, setGeezText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = () => {
    // Simulate a translation process
    setTranslatedText("Translated version of: " + geezText);
    // Here, integrate your actual translation API or logic
  };

  return (
    <div className="flex sitems-center justify-center container mx-auto px-4 min-h-[65vh]">
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
      </div>
    </div>
  );
}

export default HomePage;
