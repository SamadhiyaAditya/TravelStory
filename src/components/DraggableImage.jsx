import React, { useState, useRef, useEffect } from 'react';

const DraggableImage = ({ src, id, canvasRef }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    const imgRect = e.target.getBoundingClientRect();
    setDragging(true);
    setOffset({
      x: e.clientX - imgRect.left,
      y: e.clientY - imgRect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - offset.x;
    const y = e.clientY - canvasRect.top - offset.y;

    setPosition({ x, y });
  };

  const stopDragging = () => {
    setDragging(false);
  };

  // Attach global listeners for consistent dragging
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  });

  return (
    <img
      src={src}
      alt={`uploaded-${id}`}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        maxWidth: '200px',
        maxHeight: '200px',
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    />
  );
};

export default DraggableImage;
