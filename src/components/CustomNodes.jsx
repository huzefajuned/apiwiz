import { Handle, Position } from 'reactflow';

export const ObjectNode = ({ data, selected }) => (
  <div 
    className={`px-3 py-2 rounded-md border-2 bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-600 ${
      selected ? 'ring-4 ring-red-400 bg-purple-200 dark:bg-purple-800' : ''
    }`}
    title={`Path: ${data.path}\nType: Object`}
  >
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-purple-800 dark:text-purple-200">{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const ArrayNode = ({ data, selected }) => (
  <div 
    className={`px-3 py-2 rounded-md border-2 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-600 ${
      selected ? 'ring-4 ring-red-400 bg-green-200 dark:bg-green-800' : ''
    }`}
    title={`Path: ${data.path}\nType: Array`}
  >
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-green-800 dark:text-green-200">{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const PrimitiveNode = ({ data, selected }) => (
  <div 
    className={`px-3 py-2 rounded-md border-2 bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-600 ${
      selected ? 'ring-4 ring-red-400 bg-yellow-200 dark:bg-yellow-800' : ''
    }`}
    title={`Path: ${data.path}\nValue: ${JSON.stringify(data.value)}\nType: ${typeof data.value}`}
  >
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200 max-w-xs truncate">
      {data.label}
    </div>
  </div>
);