import { useState } from 'react';

const SearchBar = ({ onSearch, searchResult, availablePaths = [] }) => {
  const [searchPath, setSearchPath] = useState('');

  const handleSearch = () => {
    onSearch(searchPath);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white border rounded-lg">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchPath}
          onChange={(e) => setSearchPath(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by path (e.g., $.user.name, $.items[0].price)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Search
        </button>
      </div>
      
      {searchResult && (
        <div className={`p-2 rounded-md text-sm ${
          searchResult.found 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {searchResult.found ? 'Match found' : 'No match found'}
        </div>
      )}
      
      {availablePaths.length > 0 && (
        <details className="text-xs text-gray-600">
          <summary className="cursor-pointer hover:text-gray-800">Available paths ({availablePaths.length})</summary>
          <div className="mt-2 max-h-32 overflow-y-auto">
            {availablePaths.slice(0, 10).map((path, index) => (
              <div key={index} className="font-mono text-xs py-1 hover:bg-gray-100 cursor-pointer" 
                   onClick={() => setSearchPath(path)}>
                {path}
              </div>
            ))}
            {availablePaths.length > 10 && <div className="text-gray-400">...and {availablePaths.length - 10} more</div>}
          </div>
        </details>
      )}
    </div>
  );
};

export default SearchBar;