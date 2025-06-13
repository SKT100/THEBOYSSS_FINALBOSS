import React from 'react';
import micIcon from '../assets/mic.svg';
import micOffIcon from '../assets/mic-off.svg';
import camIcon from '../assets/video.svg';
import camOffIcon from '../assets/video-off.svg';
import endIcon from '../assets/end-call.svg';
import recordIcon from '../assets/record.svg';
import shareIcon from '../assets/share.svg';

const ControlBar = () => {
  return (
    <div className="control-bar">
      <button><img src={recordIcon} alt="Record" /></button>
      <button><img src={camIcon} alt="Toggle Video" /></button>
      <button><img src={micIcon} alt="Toggle Mic" /></button>
      <button className="end-call"><img src={endIcon} alt="End Call" /></button>
      <button><img src={shareIcon} alt="Share" /></button>
    </div>
  );
};

export default ControlBar;
