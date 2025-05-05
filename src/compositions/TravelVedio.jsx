import React from 'react';
import { Composition } from 'remotion';
import { TravelStoryAnimation } from './TravelStoryAnimation';

export const TravelVideo = ({ images, texts }) => {
  return (
    <Composition
      id="TravelStoryVideo"
      component={TravelStoryAnimation}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
      images={images}
      texts={texts}
    />
  );
};
