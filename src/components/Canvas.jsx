import React, { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import DraggableImage from './DraggableImage';
import DraggableText from './DraggableText';
import '../styles/Canvas.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Canvas = () => {
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const canvasRef = useRef();
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('Saving your story...');
  const progressRef = useRef(null);

  useEffect(() => {
    if (saving && progressRef.current) {
      animate(progressRef.current, {
        width: '100%',
        duration: 2000,
        easing: 'linear',
      });

      setTimeout(() => {
        setSaveMessage('✅ Journal saved successfully!');
        setTimeout(() => {
          setSaving(false);
          if (progressRef.current) progressRef.current.style.width = '0%';
        }, 1500);
      }, 2000);
    }
  }, [saving]);

  const handleGenerateVideo = () => {
    const videoData = { images, texts };
    generateRemotionVideo(videoData);
  };

  const handleExportPDF = async () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasImage = await html2canvas(canvasElement);

    const imgData = canvasImage.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvasImage.width, canvasImage.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvasImage.width, canvasImage.height);
    pdf.save('TravelJournal.pdf');
  };

  const handleSave = () => {
    setSaveMessage('Saving your story...');
    setSaving(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => [
        ...prev,
        { id: Date.now(), src: reader.result }
      ]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {saving && (
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          padding: '20px 30px',
          borderRadius: '10px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          opacity: 1,
          textAlign: 'center',
          zIndex: 1000,
          width: '300px',
        }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            {saveMessage}
          </div>
          <div style={{
            height: '10px',
            width: '100%',
            backgroundColor: '#ddd',
            borderRadius: '5px',
            overflow: 'hidden',
          }}>
            <div
              ref={progressRef}
              style={{
                width: '0%',
                height: '100%',
                backgroundColor: '#4CAF50',
              }}
            />
          </div>
        </div>
      )}

      <div className="controls">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={() => setTexts([...texts, { id: Date.now() }])}>
          Add Text
        </button>
      </div>

      <div className="canvas" ref={canvasRef}>
        {images.map((img) => (
          <DraggableImage key={img.id} id={img.id} src={img.src} canvasRef={canvasRef} />
        ))}
        {texts.map((txt) => (
          <DraggableText key={txt.id} id={txt.id} canvasRef={canvasRef} />
        ))}
      </div>

      <button id="saveBtn" onClick={handleSave} style={{ marginLeft: '10px' }}>
        Save
      </button>
      {!saving && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleExportPDF}>
            Export as PDF
          </button>
        </div>
      )}
      <button onClick={handleGenerateVideo}>
        Generate Travel Video
      </button>
    </div>
  );
};

export default Canvas;
