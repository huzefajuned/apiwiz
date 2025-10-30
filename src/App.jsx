import { useState, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import JSONInput from './components/JSONInput';
import SearchBar from './components/SearchBar';
import TreeVisualization from './components/TreeVisualization';
import { validateJSON, createNodesFromJSON, searchNodeByPath } from './utils/jsonParser';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleVisualize = (jsonText) => {
    const { isValid, data, error: validationError } = validateJSON(jsonText);
    
    if (!isValid) {
      setError(validationError);
      setNodes([]);
      setEdges([]);
      return;
    }

    setError('');
    const { nodes: newNodes, edges: newEdges } = createNodesFromJSON(data);
    setNodes(newNodes);
    setEdges(newEdges);
    setSearchResult(null);
    setHighlightedNodeId(null);
  };

  const handleSearch = (searchPath) => {
    if (!searchPath.trim()) {
      setSearchResult(null);
      setHighlightedNodeId(null);
      return;
    }
    
    const foundNode = searchNodeByPath(nodes, searchPath);
    
    if (foundNode) {
      setSearchResult({ found: true });
      setHighlightedNodeId(foundNode.id);
    } else {
      setSearchResult({ found: false });
      setHighlightedNodeId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              JSON Tree Visualizer
            </h1>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <JSONInput onVisualize={handleVisualize} error={error} />
              <SearchBar 
                onSearch={handleSearch} 
                searchResult={searchResult} 
                availablePaths={nodes?.map(node => node.data.path) || []}
              />
            </div>

            <div className="flex-1">
              <ReactFlowProvider>
                <TreeVisualization 
                  nodes={nodes} 
                  edges={edges} 
                  highlightedNodeId={highlightedNodeId}
                />
              </ReactFlowProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;