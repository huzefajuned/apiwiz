import { Handle, Position } from 'reactflow';

export const ObjectNode = ({ data, selected }) => (
  <div className={`px-3 py-2 rounded-md border-2 bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 ${
    selected ? 'ring-2 ring-yellow-400' : ''
  }`}>
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-blue-800 dark:text-blue-200">{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const ArrayNode = ({ data, selected }) => (
  <div className={`px-3 py-2 rounded-md border-2 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-600 ${
    selected ? 'ring-2 ring-yellow-400' : ''
  }`}>
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-green-800 dark:text-green-200">{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const PrimitiveNode = ({ data, selected }) => (
  <div className={`px-3 py-2 rounded-md border-2 bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600 ${
    selected ? 'ring-2 ring-yellow-400' : ''
  }`}>
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-orange-800 dark:text-orange-200 max-w-xs truncate">
      {data.label}
    </div>
  </div>
);