export const validateJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    return { isValid: true, data: parsed, error: null };
  } catch (error) {
    return { isValid: false, data: null, error: error.message };
  }
};

export const createNodesFromJSON = (data, path = '$') => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  const traverse = (obj, currentPath, parentId = null) => {
    const id = `node-${nodeId++}`;
    
    if (Array.isArray(obj)) {
      nodes.push({
        id,
        data: { label: `Array [${obj.length}]`, path: currentPath, type: 'array' },
        position: { x: 0, y: 0 },
        type: 'arrayNode'
      });
      
      if (parentId) {
        edges.push({ id: `edge-${parentId}-${id}`, source: parentId, target: id });
      }
      
      obj.forEach((item, index) => {
        traverse(item, `${currentPath}[${index}]`, id);
      });
    } else if (obj !== null && typeof obj === 'object') {
      nodes.push({
        id,
        data: { label: 'Object', path: currentPath, type: 'object' },
        position: { x: 0, y: 0 },
        type: 'objectNode'
      });
      
      if (parentId) {
        edges.push({ id: `edge-${parentId}-${id}`, source: parentId, target: id });
      }
      
      Object.entries(obj).forEach(([key, value]) => {
        const newPath = currentPath === '$' ? `$.${key}` : `${currentPath}.${key}`;
        traverse(value, newPath, id);
      });
    } else {
      const keyName = currentPath.includes('[') 
        ? currentPath.split('[').pop().replace(']', '') 
        : currentPath.split('.').pop();
      
      nodes.push({
        id,
        data: { 
          label: `${keyName}: ${JSON.stringify(obj)}`, 
          path: currentPath, 
          type: 'primitive',
          value: obj 
        },
        position: { x: 0, y: 0 },
        type: 'primitiveNode'
      });
      
      if (parentId) {
        edges.push({ id: `edge-${parentId}-${id}`, source: parentId, target: id });
      }
    }
    
    return id;
  };

  traverse(data, path);
  return { nodes, edges };
};

export const searchNodeByPath = (nodes, searchPath) => {
  // Normalize the search path
  const normalizedSearch = searchPath.trim();
  
  return nodes.find(node => {
    const nodePath = node.data.path;
    return nodePath === normalizedSearch || 
           nodePath.toLowerCase() === normalizedSearch.toLowerCase();
  });
};