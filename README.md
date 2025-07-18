# Visual Chatbot Flow Builder

A modern, interactive chatbot flow editor built with React and React Flow. This application allows users to create, edit, and manage chatbot conversation flows through an intuitive drag-and-drop interface.

## Live 
https://chatbot-flow-builder-dusky.vercel.app/

## 🚀 Features

### Core Functionality
- **Drag & Drop Interface**: Easily add message nodes by dragging from the sidebar
- **Visual Flow Connections**: Connect nodes with smooth, curved edges
- **Real-time Editing**: Edit message content with instant visual updates
- **Flow Validation**: Smart validation prevents invalid flow structures
- **Professional UI**: Clean, modern interface inspired by popular flow builders

### Node Management
- **Message Nodes**: WhatsApp-style message blocks with teal gradient headers
- **Connection Handles**: Top target (multiple incoming) and bottom source (single outgoing)
- **Node Selection**: Click nodes to access editing options
- **Dynamic Content**: Real-time message updates reflected in the canvas

### Validation Rules
- **Single Root Node**: Only one node can have no incoming connections
- **Connection Constraints**: Each node can have only one outgoing edge
- **Error Feedback**: Visual error banner when validation fails
- **Save Protection**: Prevents saving invalid flow configurations

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Flow** - Powerful flow diagram library for node-based editors
- **TypeScript** - Type-safe development with full IntelliSense
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, customizable icons
- **Nanoid** - Secure, URL-safe unique ID generator
- **Vite** - Fast build tool and development server

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── FlowCanvas.tsx   # Main flow editor component
│   ├── TextNode.tsx     # Custom message node component
│   ├── NodesPanel.tsx   # Drag-and-drop sidebar panel
│   ├── SettingsPanel.tsx # Node editing interface
│   └── SaveButton.tsx   # Save functionality with validation
├── utils/               # Utility functions
│   └── validateFlow.ts  # Flow validation logic
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared interfaces and types
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🎯 Key Components

### FlowCanvas.tsx
The main orchestrator component that manages the entire flow editor:

```typescript
// Core state management
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
```

**Key Features:**
- Manages all nodes and edges state
- Handles drag-and-drop operations
- Coordinates between panels (nodes/settings)
- Implements connection validation
- Provides save functionality with error handling

### TextNode.tsx
Custom React Flow node component for message blocks:

```typescript
const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data, selected }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg border-2 min-w-[200px] ${
      selected ? 'border-blue-400' : 'border-gray-200'
    }`}>
      {/* Node content with handles */}
    </div>
  );
};
```

**Features:**
- WhatsApp-style design with teal gradient header
- Message Square icon from Lucide React
- Target handle (top) for incoming connections
- Source handle (bottom) for outgoing connections
- Visual selection feedback

### NodesPanel.tsx
Sidebar component for adding new nodes:

```typescript
const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, 'textNode')}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-grab"
      >
        {/* Draggable message node template */}
      </div>
    </div>
  );
};
```

**Features:**
- Fixed-width sidebar (320px)
- Draggable message node template
- Visual feedback on hover
- Clean, professional styling

### SettingsPanel.tsx
Node editing interface that replaces the nodes panel:

```typescript
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  message,
  onMessageChange,
  onBack
}) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        className="w-full h-32 p-3 border border-gray-300 rounded-lg"
      />
    </div>
  );
};
```

**Features:**
- Real-time message editing
- Back navigation to nodes panel
- Consistent width with nodes panel
- Auto-resizing textarea

### validateFlow.ts
Core validation logic for flow integrity:

```typescript
export const validateFlow = (nodes: FlowNode[], edges: FlowEdge[]): ValidationResult => {
  const nodesWithIncomingEdges = new Set(edges.map(edge => edge.target));
  const rootNodes = nodes.filter(node => !nodesWithIncomingEdges.has(node.id));
  
  if (rootNodes.length > 1) {
    return { isValid: false, errors: ['Cannot save Flow'] };
  }
  
  return { isValid: true, errors: [] };
};
```

**Validation Rules:**
- Identifies nodes with no incoming edges (root nodes)
- Prevents multiple root nodes in a single flow
- Returns detailed error information
- Enables/disables save functionality

## 🎨 Design System

### Color Palette
- **Primary**: Teal gradient (`from-teal-400 to-teal-500`)
- **Background**: Light gray (`bg-gray-50`)
- **Cards**: White with subtle shadows
- **Borders**: Light gray (`border-gray-200`)
- **Text**: Dark gray hierarchy (`text-gray-700`, `text-gray-800`)

### Typography
- **Headers**: Semi-bold, appropriate sizing
- **Body**: Regular weight, good contrast
- **Code**: Monospace font for technical elements

### Spacing
- **Consistent 8px grid**: All spacing follows 8px increments
- **Component padding**: 24px (p-6) for major sections
- **Element gaps**: 12px-16px for related items

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatbot-flow-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 Usage Guide

### Adding Nodes
1. Drag the "Message" block from the right sidebar
2. Drop it anywhere on the canvas
3. A new message node will be created with a default message

### Connecting Nodes
1. Click and drag from the bottom handle (source) of any node
2. Connect to the top handle (target) of another node
3. Only one outgoing connection per node is allowed
4. Multiple incoming connections are supported

### Editing Messages
1. Click on any node to select it
2. The settings panel will appear on the right
3. Edit the message content in the textarea
4. Changes are reflected immediately on the canvas
5. Click the back arrow to return to the nodes panel

### Saving Flows
1. Click "Save Changes" in the top-right corner
2. The system validates the flow structure
3. If invalid (multiple root nodes), an error banner appears
4. Valid flows can be saved successfully

## 🧪 Validation Logic

The application implements sophisticated validation to ensure flow integrity:

### Connection Rules
- **Single Outgoing Edge**: Each node can connect to only one other node
- **Multiple Incoming Edges**: Nodes can receive connections from multiple sources
- **No Self-Loops**: Nodes cannot connect to themselves
- **Duplicate Prevention**: Prevents duplicate connections between the same nodes

### Flow Structure Rules
- **Single Root Node**: Only one node can have zero incoming connections
- **Connected Components**: All nodes should be part of a connected flow
- **Cycle Detection**: Prevents circular dependencies (future enhancement)

## 🚀 Performance Optimizations

### React Flow Optimizations
- **Node Memoization**: Custom nodes are memoized to prevent unnecessary re-renders
- **Edge Optimization**: Uses smooth step edges for better performance
- **Viewport Management**: Automatic fitting and zoom controls

### State Management
- **Efficient Updates**: Uses React Flow's built-in state management
- **Selective Re-renders**: Components only update when necessary
- **Callback Optimization**: All event handlers are properly memoized

## 🔮 Future Enhancements

### Planned Features
- **Multiple Node Types**: Support for different message types (text, image, button)
- **Conditional Logic**: Add decision nodes with branching logic
- **Flow Templates**: Pre-built templates for common use cases
- **Export/Import**: Save and load flows as JSON files
- **Collaboration**: Real-time collaborative editing
- **Testing Mode**: Simulate conversations through the flow

### Technical Improvements
- **Undo/Redo**: Command pattern for action history
- **Keyboard Shortcuts**: Power user features
- **Accessibility**: Full WCAG compliance
- **Mobile Support**: Touch-friendly interface
- **Performance**: Virtual scrolling for large flows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- **React Flow** - Excellent flow diagram library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

---

Built with ❤️ using React and React Flow
