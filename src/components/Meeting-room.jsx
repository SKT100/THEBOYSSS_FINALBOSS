import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SecurityIcon from "../assets/Security.svg";
import "./Meeting-room.css";
import {
  FaMicrophoneSlash,
  FaVideoSlash,
  FaPhoneSlash,
  FaRegCircle,
  FaBars,
  FaUserFriends,
  FaComments,
  FaCog,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineScreenShare } from "react-icons/md";

const MeetingRoom = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  const [jiggle, setJiggle] = useState(false);
  const [stream, setStream] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const localVideoRef = useRef();
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
        startTimer();
      })
      .catch((err) => console.error("Media access error:", err));

    return () => stopTimer();
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const formatTime = (sec) => {
    const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
    const seconds = String(sec % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !audioEnabled;
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !videoEnabled;
      setVideoEnabled(!videoEnabled);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    stopTimer();
    navigate("/");
  };

  const toggleRecording = () => {
    if (!stream) return;

    if (!isRecording) {
      recordedChunks.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm";
        a.click();
        URL.revokeObjectURL(url);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];
      if (stream) {
        const sender = stream.getVideoTracks()[0];
        stream.removeTrack(sender);
        stream.addTrack(screenTrack);
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
    triggerJiggle();
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    triggerJiggle();
  };

  const triggerJiggle = () => {
    setJiggle(true);
    setTimeout(() => setJiggle(false), 400);
  };

  return (
    <div className="meeting-room">
      {/* Top Icons */}
      <div className="top-bar">
        <div className="top-left-icon">
          <img src={SecurityIcon} alt="Security Icon" />
        </div>
        <div className="meeting-timer">{formatTime(timer)}</div>
        <div className="top-right-icon" onClick={openSidebar}>
          <FaBars />
        </div>
      </div>

      {/* Local Video */}
      <div
        className={`video-preview-container ${isFullscreen ? "fullscreen" : ""}`}
        onClick={() => setIsFullscreen(!isFullscreen)}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="local-video"
        />
      </div>

      {/* Control Bar */}
      <div className="control-bar">
        <button className="control-btn" onClick={toggleRecording}>
          <FaRegCircle
            className="control-icon"
            color={isRecording ? "red" : "white"}
          />
        </button>
        <button className="control-btn" onClick={toggleVideo}>
          <FaVideoSlash
            className="control-icon"
            color={videoEnabled ? "white" : "red"}
          />
        </button>
        <button className="control-btn" onClick={toggleAudio}>
          <FaMicrophoneSlash
            className="control-icon"
            color={audioEnabled ? "white" : "red"}
          />
        </button>
        <button className="control-btn end-call" onClick={endCall}>
          <FaPhoneSlash className="control-icon" />
        </button>
        <button className="control-btn" onClick={startScreenShare}>
          <MdOutlineScreenShare className="control-icon" />
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className={`right-sidebar ${jiggle ? "jiggle" : ""}`}>
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${
                activeTab === "participants" ? "active" : ""
              }`}
              onClick={() => setActiveTab("participants")}
            >
              <FaUserFriends /> Participants
            </button>
            <button
              className={`tab-btn ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              <FaComments /> Chat
            </button>
          </div>

          <div className="sidebar-content">
            {activeTab === "participants" ? (
              <div className="tab-panel">
                <p>John Doe</p>
                <p>Jane Smith</p>
              </div>
            ) : (
              <>
                <div className="tab-panel chat-panel">
                  <p>
                    <strong>John:</strong> Hello!
                  </p>
                  <p>
                    <strong>You:</strong> Hi!
                  </p>
                </div>
                <div className="chat-input-bar">
                  <input
                    className="chat-input"
                    type="text"
                    placeholder="Type a message..."
                  />
                  <button className="send-btn">
                    <FaArrowRight />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="sidebar-bottom">
            <button onClick={closeSidebar}>
              <FaArrowRight />
            </button>
            <button>
              <FaCog />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingRoom;
