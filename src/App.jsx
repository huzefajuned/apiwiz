import { useState } from 'react';
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

    console.log('Searching for:', searchPath);
    console.log('Available paths:', nodes.map(n => n.data.path));
    
    const foundNode = searchNodeByPath(nodes, searchPath);
    
    if (foundNode) {
      console.log('Found node:', foundNode);
      setSearchResult({ found: true });
      setHighlightedNodeId(foundNode.id);
    } else {
      console.log('No node found');
      setSearchResult({ found: false });
      setHighlightedNodeId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              JSON Tree Visualizer
            </h1>
            <p className="text-gray-600">
              Paste your JSON data and visualize it as an interactive tree
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <JSONInput onVisualize={handleVisualize} error={error} />
              <SearchBar 
                onSearch={handleSearch} 
                searchResult={searchResult} 
                availablePaths={nodes.map(node => node.data.path)}
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