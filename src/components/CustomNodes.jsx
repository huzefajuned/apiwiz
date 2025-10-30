import { Handle, Position } from 'reactflow';

export const ObjectNode = ({ data, selected }) => (
  <div className={`px-3 py-2 rounded-md border-2 bg-blue-100 border-blue-300 ${
    selected ? 'ring-2 ring-yellow-400' : ''
  }`}>
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-blue-800">{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const ArrayNode = ({ data, selected }) => (
  <div className={`px-3 py-2 rounded-md border-2 bg-green-100 border-green-300 ${
    selected ? 'ring-2 ring-yellow-400' : ''
  }`}>
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-green-800">{data.label}</div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const PrimitiveNode = ({ data, selected }) => (
  <div className={`px-3 py-2 rounded-md border-2 bg-orange-100 border-orange-300 ${
    selected ? 'ring-2 ring-yellow-400' : ''
  }`}>
    <Handle type="target" position={Position.Top} />
    <div className="text-sm font-medium text-orange-800 max-w-xs truncate">
      {data.label}
    </div>
  </div>
);