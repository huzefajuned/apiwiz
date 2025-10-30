import { useState } from 'react';

const JSONInput = ({ onVisualize, error }) => {
  const [jsonText, setJsonText] = useState('');

  const sampleJSON = `{
  "user": {
    "name": "John Doe",
    "age": 30,
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  },
  "items": [
    { "name": "laptop", "price": 999 },
    { "name": "mouse", "price": 25 }
  ]
}`;

  const handleVisualize = () => {
    onVisualize(jsonText || sampleJSON);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          JSON Input
        </label>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder={sampleJSON}
          className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      
      <button
        onClick={handleVisualize}
        className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate Tree
      </button>
    </div>
  );
};

export default JSONInput;