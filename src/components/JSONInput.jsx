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
    <div className="flex flex-col gap-4 p-4 bg-white border rounded-lg">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          JSON Input
        </label>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder={sampleJSON}
          className="w-full h-40 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <button
        onClick={handleVisualize}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate Tree
      </button>
    </div>
  );
};

export default JSONInput;