import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const TravelStoryAnimation = ({ images, texts }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const animateIn = (startFrame, duration) => {
    const progress = Math.min((frame - startFrame) / duration, 1);
    return progress;
}

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {images.map((img, index) => {
        const startFrame = index * (fps * 1);
        const scale = animateIn(startFrame, fps * 1);
        const opacity = animateIn(startFrame, fps * 1);

        return (
          <Img
            key={img.id}
            src={img.src}
            style={{
              position: 'absolute',
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              transform: `scale(${scale})`,
              opacity,
              transition: 'transform 1s ease, opacity 1s ease',
            }}
          />
        );
      })}

      {texts.map((text, index) => {
        const startFrame = (images.length + index) * (fps * 1);
        const opacity = animateIn(startFrame, fps * 1);

        return (
          <div
            key={text.id}
            style={{
              position: 'absolute',
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              opacity,
              transition: 'opacity 1s ease',
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {text.content}
          </div>
        );
      })}
    </div>
  );
};
