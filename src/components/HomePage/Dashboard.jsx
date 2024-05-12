import { useState } from 'react';

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  // Function to handle translation
  const handleTranslation = () => {
    // Here you can add your translation logic
    // For simplicity, let's just reverse the input text
    const reversedText = inputText.split('').reverse().join('');
    setTranslatedText(reversedText);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Geez to Amharic Translation</h1>
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md"
          rows="5"
          placeholder="Enter text in Geez"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleTranslation}
        >
          Translate
        </button>
        {translatedText && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Translated Text:</h2>
            <p className="p-4 border border-gray-300 rounded-md">{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
