import React from 'react';
import './Meeting-room.css';

const MeetingRoom = () => {
  return (
    <div className="meeting-frame">
      <div className="top-bar">
        <div className="status-icon">✔️</div>
        <div className="menu-icon">☰</div>
      </div>

      <div className="meeting-scene">
        <div className="video-screen">
          <div className="tile">👩‍💻</div>
          <div className="tile">🧑‍🏫</div>
          <div className="tile">👨‍💼</div>
          <div className="tile">🧔</div>
        </div>

        <div className="avatar-area">
          <div className="avatar"><img src="/avatar1.png" alt="Mike"/><span>Mike</span></div>
          <div className="avatar"><img src="/avatar2.png" alt="Ina"/><span>Ina</span></div>
          <div className="avatar"><img src="/avatar3.png" alt="Alex"/><span>Alex</span></div>
        </div>

        <div className="volume-slider">
          <input type="range" min="0" max="100" orient="vertical" />
        </div>
      </div>

      <div className="control-bar">
        <button className="control-btn">🔴</button>
        <button className="control-btn">📷❌</button>
        <button className="control-btn">🎤❌</button>
        <button className="control-btn">📞</button>
        <button className="control-btn">📤</button>
      </div>
    </div>
  );
};

export default MeetingRoom;
