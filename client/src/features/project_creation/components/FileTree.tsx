
import React from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  onFileSelect: (fileName: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ files, onFileSelect }) => {
  const [openFolders, setOpenFolders] = React.useState<string[]>([]);

  const toggleFolder = (folderName: string) => {
    setOpenFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName) 
        : [...prev, folderName]
    );
  };

  const renderNode = (node: FileNode, level = 0) => {
    const isOpen = openFolders.includes(node.name);

    if (node.type === 'folder') {
      return (
        <div key={node.name} style={{ paddingLeft: `${level * 1.5}rem` }}>
          <div 
            className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-1"
            onClick={() => toggleFolder(node.name)}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="ml-2 font-medium">{node.name}</span>
          </div>
          {isOpen && node.children?.map(child => renderNode(child, level + 1))}
        </div>
      );
    }

    return (
      <div 
        key={node.name} 
        style={{ paddingLeft: `${level * 1.5}rem` }}
        className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-1"
        onClick={() => onFileSelect(node.name)}
      >
        <FileText size={16} className="ml-1" />
        <span className="ml-2">{node.name}</span>
      </div>
    );
  };

  return <div className="space-y-2">{files.map(node => renderNode(node))}</div>;
};

export default FileTree;
