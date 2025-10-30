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
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchPath}
          onChange={(e) => setSearchPath(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by path (e.g., $.user.name, $.items[0].price)"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Search
        </button>
      </div>
      
      {searchResult && (
        <div className={`mt-3 p-2 rounded-md text-sm ${
          searchResult.found 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {searchResult.found ? 'Match found' : 'No match found'}
        </div>
      )}
      
      {availablePaths.length > 0 && (
        <details className="mt-3 text-xs text-gray-600 dark:text-gray-400">
          <summary className="cursor-pointer hover:text-gray-800 dark:hover:text-gray-200">
            Available paths ({availablePaths.length})
          </summary>
          <div className="mt-2 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-md p-2">
            {availablePaths.slice(0, 10).map((path, index) => (
              <div key={index} className="font-mono text-xs py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded" 
                   onClick={() => setSearchPath(path)}>
                {path}
              </div>
            ))}
            {availablePaths.length > 10 && <div className="text-gray-400 dark:text-gray-500 text-xs px-2 py-1">...and {availablePaths.length - 10} more</div>}
          </div>
        </details>
      )}
    </div>
  );
};

export default SearchBar;