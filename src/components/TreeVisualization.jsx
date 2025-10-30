import { useCallback, useEffect, useState, useMemo } from 'react';
import ReactFlow, { 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  Background,
  Controls,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ObjectNode, ArrayNode, PrimitiveNode } from './CustomNodes';

const nodeTypes = {
  objectNode: ObjectNode,
  arrayNode: ArrayNode,
  primitiveNode: PrimitiveNode,
};

const TreeVisualization = ({ nodes: initialNodes, edges: initialEdges, highlightedNodeId }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { fitView, setCenter } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    if (initialNodes && initialEdges) {
      // Simple layout algorithm
      const layoutNodes = initialNodes.map((node, index) => {
        const level = node.data.path.split(/[.\[]/).length - 1;
        return {
          ...node,
          position: {
            x: (index % 3) * 200,
            y: level * 100
          }
        };
      });
      
      setNodes(layoutNodes);
      setEdges(initialEdges);
      
      setTimeout(() => fitView(), 100);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  useEffect(() => {
    if (highlightedNodeId) {
      const highlightedNode = nodes.find(node => node.id === highlightedNodeId);
      if (highlightedNode) {
        setCenter(highlightedNode.position.x, highlightedNode.position.y, { zoom: 1.2 });
        
        setNodes(currentNodes => 
          currentNodes.map(node => ({
            ...node,
            selected: node.id === highlightedNodeId
          }))
        );
      }
    }
  }, [highlightedNodeId, setCenter, setNodes]);

  const toggleFullscreen = () => {
    const element = document.querySelector('.react-flow-container');
    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleZoomIn = () => {
    const { zoomIn } = useReactFlow();
    zoomIn();
  };

  const handleZoomOut = () => {
    const { zoomOut } = useReactFlow();
    zoomOut();
  };

  const handleFitView = () => {
    fitView();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative w-full h-96 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 react-flow-container">
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <button
          onClick={handleZoomIn}
          className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-600"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-600"
          title="Zoom Out"
        >
          -
        </button>
        <button
          onClick={handleFitView}
          className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-600"
          title="Fit View"
        >
          ⌂
        </button>
        <button
          onClick={toggleFullscreen}
          className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {isFullscreen ? '⤓' : '⤢'}
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeVisualization;