import React, { useState } from "react";
import "./Sidebar.css";
import { FaMicrophone, FaVideo, FaUserFriends, FaComments } from "react-icons/fa";

const participants = [
  { name: "Monali", role: "Project Manager", mic: true, cam: true },
  { name: "Ducker", role: "Software Developer", mic: true, cam: true },
  { name: "Champa", role: "Web Developer", mic: true, cam: true },
  { name: "Nandu", role: "Data Analyst", mic: true, cam: true },
  { name: "Ramesh", role: "Sr. Product Manager", mic: true, cam: true },
  { name: "Ghora Singh", role: "Team Lead", mic: true, cam: true },
  { name: "Kamlesh", role: "Cloud Engineer", mic: true, cam: true },
  { name: "Mustafa", role: "Backend Lead", mic: true, cam: true },
  { name: "Kalua", role: "Sr. Software Developer", mic: true, cam: true },
  { name: "Chammi", role: "UI/UX Designer", mic: true, cam: true },
  { name: "Charlie", role: "Web Consultant", mic: true, cam: true },
];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("participants");

  return (
    <div className="sidebar-container">
      <div className="sidebar-tabs">
        <button
          className={activeTab === "participants" ? "active" : ""}
          onClick={() => setActiveTab("participants")}
        >
          <FaUserFriends /> Participants
        </button>
        <button
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}
        >
          <FaComments /> Chats
        </button>
      </div>

      {activeTab === "participants" ? (
        <div className="participants-list">
          {participants.map((p, index) => (
            <div className="participant" key={index}>
              <div className="profile-pic" />
              <div className="details">
                <div className="name">{p.name}</div>
                <div className="role">{p.role}</div>
              </div>
              <div className="status-icons">
                {p.mic && <FaMicrophone />}
                {p.cam && <FaVideo />}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-section">
          <p className="no-chats">No chats yet.</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
