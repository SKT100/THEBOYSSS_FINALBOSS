import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import './HomePage.css';


const HomePage = () => {
  const [time, setTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({ description: '', dateTime: '' });
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="logo-section">
          <img src="logo-white.svg" alt="Logo" className="logo-img" />
          <div className="logo">BEYOND<span>meet</span></div>
        </div>

        <ul className="nav-list">
          <li><img src="conference.svg" alt="conference" className='conference-img' />Conference Rooms</li>
          <li><img src="network.svg" alt="network" className='network-img' />Network</li>
          <li><img src="avatar.svg" alt="avatar" className='avatar-img' />Avatar</li>
          <li><img src="settings.svg" alt="settings" className='setting-img' />Settings</li>
        </ul>

        <div className="profile-section" onClick={() => setActivePage('profile')}>
          <img src="profile-photo.png" alt="profile" className="profile-pic" />
          <p>Profile</p>
        </div>
      </aside>

      <main className="main-content">
        {activePage === 'home' ? (
          <>
            <div className="clock-box">
              <h1>{formattedTime}</h1>
              <p>{formattedDate}</p>
            </div>

            <h2 className="rooms-title">Rooms</h2>
            <div className="room-cards">
              <div className="room-card">
                <img src="classroom.jpg" alt="Class Room" />
                <p>CLASS ROOM</p>
              </div>
              <div className="room-card">
                <img src="boardroom.jpg" alt="Board Room" />
                <p>BOARD ROOM</p>
              </div>
            </div>

            <div className="buttons">
              <button className="new-meeting" onClick={() => setShowModal(true)}>
                <img src="new-meeting-icon.svg" alt="New Meeting" className='button-icon' />
                <span>New Meeting</span>
              </button>

              <button className="join-meeting">
                <img src="join-meeting-icon.svg" alt="Join Meeting" className='button-icon' />
                <span>Join Meeting</span>
              </button>
            </div>

            {showModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <button className="close-btn" onClick={() => setShowModal(false)}>
                    <img src="cross.svg" alt="Close" />
                  </button>
                  <h2>Create Meeting</h2>
                  <label>Add a description : </label>
                  <input type="text" placeholder='Enter description' />
                  <label>Select Date & Time : </label>
                  <input type="datetime-local" />
                  <button
                    className='create-meeting-btn'
                    onClick={() => {
                      const description = document.querySelector('input[type="text"]').value;
                      const dateTime = document.querySelector('input[type="datetime-local"]').value;
                      setMeetingDetails({ description, dateTime });
                      setShowModal(false);
                      setShowConfirmation(true);
                    }}
                  >
                    Create Meeting
                  </button>
                </div>
              </div>
            )}

            {showConfirmation && (
              <div className="modal-overlay">
                <div className="confirmation-popup">
                  <img src="tick.png" alt="check" className="confirmation-icon" />
                  <h2 className="confirmation-heading">Meeting Created</h2>
                  <p className="confirmation-description">{meetingDetails.description}</p>
                  <p className="confirmation-time">
                    {new Date(meetingDetails.dateTime).toLocaleString(undefined, {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </p>
                  <button
                    className="confirmation-copy"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `Meeting: ${meetingDetails.description}\nTime: ${new Date(meetingDetails.dateTime).toLocaleString()}`
                      )
                    }
                  >
                    Copy Invitation
                  </button>
                  <button
                    className="confirmation-close"
                    onClick={() => {
                      setShowConfirmation(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ) : activePage === 'profile' ? (
          <Profile />
        ) : null}
      </main>
    </div>
  );
};

export default HomePage;
