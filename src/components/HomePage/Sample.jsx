import  { useState } from 'react';
import axios from 'axios';

const Sample = () => {
  const [geezText, setGeezText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [unknownWords, setUnknownWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://geeztoamharic.loca.lt/translate', {
        paragraph: geezText,
      });

      if (response.status !== 200) {
        throw new Error('Translation API request failed');
      }

      setTranslatedText(response.data.translation);
      setUnknownWords(response.data.unknown_words);
    } catch (error) {
      console.error('Error translating text:', error);
      setError('Error translating text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Geez to Amharic Translation</h1>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded-md"
          rows="5"
          placeholder="Enter Geez text here..."
          value={geezText}
          onChange={(e) => setGeezText(e.target.value)}
        ></textarea>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {translatedText && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Translated Text:</h2>
          <p className="p-4 border rounded-md bg-gray-100">{translatedText}</p>
        </div>
      )}
      {unknownWords.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Unknown Words:</h2>
          <ul className="list-disc list-inside">
            {unknownWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sample;
