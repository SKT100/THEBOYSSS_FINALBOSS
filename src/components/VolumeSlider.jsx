import React from 'react';
import volumeIcon from '../assets/volume.svg';

const VolumeSlider = () => (
  <div className="volume-slider">
    <input type="range" min="0" max="100" orient="vertical" />
    <img src={volumeIcon} alt="Volume" />
  </div>
);

export default VolumeSlider;
