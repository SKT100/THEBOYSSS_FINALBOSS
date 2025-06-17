import React, { useEffect, useState, useContext } from 'react';
import Profile from './Profile';
import './HomePage.css';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


import NetworkPage from './NetworkPage';
import AvatarPage from './AvatarPage';
import SettingsPage from './SettingsPage';

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({ description: '', dateTime: '' });
  const [meetingLink, setMeetingLink] = useState('');
  const [joinInput, setJoinInput] = useState('');
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [activePage, setActivePage] = useState('conference');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

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

        <div
          className={`logo-section ${activePage === 'profile' && isShrinking ? 'shrink' : ''}`}
          onClick={() => {
            if (activePage === 'profile') {
              setIsShrinking(true);
              setTimeout(() => {
                setActivePage('conference');
                setIsShrinking(false);
              }, 400); // match with CSS duration
            }
          }}
        >
          <img src="logo-white.svg" alt="Logo" className="logo-img" />
          <div className="logo">BEYOND<span>meet</span></div>
        </div>

        <ul className="nav-list">
          <li
            className={activePage === 'conference' ? 'active' : ''}
            onClick={() => setActivePage('conference')}
          >
            <img src="conference.svg" alt="conference" />
            <span className="nav-text">Conference Rooms</span>
          </li>

          <li
            className={activePage === 'network' ? 'active' : ''}
            onClick={() => setActivePage('network')}
          >
            <img src="network.svg" alt="network" />
            <span className="nav-text">Network</span>
          </li>

          <li
            className={activePage === 'avatar' ? 'active' : ''}
            onClick={() => setActivePage('avatar')}
          >
            <img src="avatar.svg" alt="avatar" />
            <span className="nav-text">Avatar</span>
          </li>

          <li
            className={activePage === 'settings' ? 'active' : ''}
            onClick={() => setActivePage('settings')}
          >
            <img src="settings.svg" alt="settings" />
            <span className="nav-text">Settings</span>
          </li>
        </ul>

        <div className="profile-section" onClick={() => setActivePage('profile')}>
          <img src="profile-photo.png" alt="profile" className="profile-pic" />
          <div>
            <p>{user?.fullName || 'Profile'}</p>
            <button className="logout-btn" onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}>Logout</button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {activePage === 'conference' ? (
          <>
            <div className="clock-box">
              <h1>{formattedTime}</h1>
              <p>{formattedDate}</p>
            </div>

            <h2 className="rooms-title">Rooms</h2>
            <div className="room-cards">
              <div
                className={`room-card ${selectedRoom === 'Classroom' ? 'selected' : ''}`}
                onClick={() => setSelectedRoom('Classroom')}
              >
                <img src="Classroom.png" alt="Class Room" />
              </div>

              <div
                className={`room-card ${selectedRoom === 'office' ? 'selected' : ''}`}
                onClick={() => setSelectedRoom('office')}
              >
                <img src="Office.png" alt="Board Room" />
              </div>
            </div>

            <div className="buttons">
              <button className="new-meeting" onClick={() => setShowModal(true)}>
                <img src="new-meeting-icon.svg" alt="New Meeting" className='button-icon' />
                <span>New Meeting</span>
              </button>

              <button className="join-meeting" onClick={() => setShowJoinPopup(true)}>
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
                  <label>Add a description:</label>
                  <input type="text" placeholder='Enter description' />
                  <label>Select Date & Time:</label>
                  <input type="datetime-local" />
                  <button
                    className='create-meeting-btn'
                    onClick={() => {
                      const description = document.querySelector('input[type="text"]').value;
                      const dateTime = document.querySelector('input[type="datetime-local"]').value;
                      const id = Math.random().toString(36).substring(2, 8);
                      const link = `${window.location.origin}/meeting/${id}`;
                      setMeetingDetails({ description, dateTime });
                      setMeetingLink(link);
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
                  <p className="confirmation-link">
                    Meeting Link:<br />
                    <span style={{ fontSize: '14px', color: '#ccc' }}>{meetingLink}</span>
                  </p>
                  <button
                    className={`confirmation-copy ${copyClicked ? 'shrink' : ''}`}
                    onClick={() => {
                      navigator.clipboard.writeText(meetingLink);
                      setCopied(true);
                      setCopyClicked(true);
                      setTimeout(() => setCopyClicked(false), 200);
                    }}
                  >
                    Copy Invitation
                  </button>
                  <button
                    className="confirmation-close"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {copied && (
              <div className="copied-popup">
                <div className="copied-box">
                  <p>Link copied!</p>
                  <button onClick={() => setCopied(false)}>OK</button>
                </div>
              </div>
            )}

            {showJoinPopup && (
              <div className="modal-overlay">
                <div className="modal">
                  <button className="close-btn" onClick={() => setShowJoinPopup(false)}>
                    <img src="cross.svg" alt="Close" />
                  </button>
                  <h2>Join a Meeting</h2>
                  <input
                    type="text"
                    placeholder="Enter Meeting ID or Link"
                    value={joinInput}
                    onChange={(e) => setJoinInput(e.target.value)}
                  />
                  <button
                    className='create-meeting-btn'
                    onClick={() => {
                      const id = joinInput.includes('/meeting/')
                        ? joinInput.split('/meeting/')[1]
                        : joinInput;
                      navigate(`/meeting/${id}`);
                    }}
                  >
                    Join
                  </button>
                </div>
              </div>
            )}
          </>
        ) : activePage === 'network' ? (
          <NetworkPage />
        ) : activePage === 'avatar' ? (
          <AvatarPage />
        ) : activePage === 'settings' ? (
          <SettingsPage />
        ) : activePage === 'profile' ? (
          <Profile />
        ) : null}
      </main>
    </div>
  );
};

export default HomePage;
