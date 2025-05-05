import React, { useState, useEffect } from 'react';

const DraggableText = ({ id, canvasRef }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('Double-click to edit');
  const [editing, setEditing] = useState(false);

  const handleMouseDown = (e) => {
    if (editing) return;
    setDragging(true);
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - offset.x;
    const y = e.clientY - canvasRect.top - offset.y;
    setPosition({ x, y });
  };

  const stopDragging = () => setDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        cursor: editing ? 'text' : 'grab',
        userSelect: 'none',
        padding: '4px 8px',
        fontSize: '18px',
        backgroundColor: 'rgba(41, 37, 37, 0.13)',
        border: editing ? '1px solid #333' : 'none',
        borderRadius: '4px',
        minWidth: '100px',
        maxWidth: '300px',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setEditing(false)}
          autoFocus
          style={{
            fontSize: '18px',
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default DraggableText;
