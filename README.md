# JSON Tree Visualizer

A simple React application that visualizes JSON data as an interactive tree structure using React Flow.

## Features

- **JSON Input & Validation**: Paste or type JSON data with real-time validation
- **Tree Visualization**: Interactive tree view with different colors for objects, arrays, and primitives
- **Search Functionality**: Search nodes by JSON path (e.g., `$.user.name`, `items[0].price`)
- **Highlighting**: Found nodes are highlighted and centered in view
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18 with Vite
- React Flow for tree visualization
- Tailwind CSS for styling
- Flexbox layout throughout

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Usage

1. Paste your JSON data in the input area (or use the sample data)
2. Click "Generate Tree" to visualize the JSON structure
3. Use the search bar to find specific nodes by their JSON path
4. Navigate the tree using zoom and pan controls

## Project Structure

```
src/
├── components/
│   ├── JSONInput.jsx       # JSON input and validation
│   ├── SearchBar.jsx       # Search functionality
│   ├── TreeVisualization.jsx # React Flow tree component
│   └── CustomNodes.jsx     # Custom node types
├── utils/
│   └── jsonParser.js       # JSON parsing utilities
├── App.jsx                 # Main application component
└── main.jsx               # Application entry point
```

## Node Types

- **Blue nodes**: JSON objects
- **Green nodes**: JSON arrays
- **Orange nodes**: Primitive values (strings, numbers, booleans, null)

## Search Format

Use JSONPath-like syntax:
- `$.user.name` - Access object property
- `$.items[0].price` - Access array element
- `$.user.address.city` - Nested object access