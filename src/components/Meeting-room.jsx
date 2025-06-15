// import React, { useState } from "react";
// import SecurityIcon from '/public/Security.svg';
// import "./Meeting-room.css";
// import {
//   FaMicrophoneSlash,
//   FaVideoSlash,
//   FaPhoneSlash,
//   FaRegCircle,
//   FaBars,
//   FaUserFriends,
//   FaComments,
//   FaCog,
//   FaArrowRight
// } from "react-icons/fa";
// import { MdOutlineScreenShare } from "react-icons/md";

// const MeetingRoom = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("participants");

//   return (
//     <div className="meeting-room">
//       {/* Top Icons */}
//       <div className="top-bar">
//         <div className="top-left-icon">
//           <img src={SecurityIcon} alt="Security Icon" />
//         </div>
//         <div className="top-right-icon" onClick={() => setIsSidebarOpen(true)}>
//           <FaBars />
//         </div>
//       </div>

//       {/* Control Bar */}
//       <div className="control-bar">
//         <button className="control-btn">
//           <FaRegCircle className="control-icon" />
//         </button>
//         <button className="control-btn">
//           <FaVideoSlash className="control-icon" />
//         </button>
//         <button className="control-btn">
//           <FaMicrophoneSlash className="control-icon" />
//         </button>
//         <button className="control-btn end-call">
//           <FaPhoneSlash className="control-icon" />
//         </button>
//         <button className="control-btn">
//           <MdOutlineScreenShare className="control-icon" />
//         </button>
//       </div>

//       {/* Right Sidebar */}
//       {isSidebarOpen && (
//         <div className="right-sidebar">
//           {/* Tabs */}
//           <div className="sidebar-tabs">
//             <button
//               className={`tab-btn ${activeTab === "participants" ? "active" : ""}`}
//               onClick={() => setActiveTab("participants")}
//             >
//               <FaUserFriends /> Participants
//             </button>
//             <button
//               className={`tab-btn ${activeTab === "chat" ? "active" : ""}`}
//               onClick={() => setActiveTab("chat")}
//             >
//               <FaComments /> Chat
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="sidebar-content">
//             {activeTab === "participants" ? (
//               <div className="tab-panel">
//                 <p>John Doe</p>
//                 <p>Jane Smith</p>
//                 <p>Bob Johnson</p>
//               </div>
//             ) : (
//               <>
//                 <div className="tab-panel chat-panel">
//                   <p><strong>John:</strong> Hello!</p>
//                   <p><strong>You:</strong> Hi everyone!</p>
//                 </div>
//                 <div className="chat-input-bar">
//                   <input
//                     className="chat-input"
//                     type="text"
//                     placeholder="Type a message..."
//                   />
//                   <button className="send-btn">
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Bottom Controls */}
//           <div className="sidebar-bottom">
//             <button onClick={() => setIsSidebarOpen(false)}>
//               <FaArrowRight />
//             </button>
//             <button>
//               <FaCog />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MeetingRoom;
import React, { useState } from "react";
import SecurityIcon from '/public/Security.svg';
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
  FaArrowRight
} from "react-icons/fa";
import { MdOutlineScreenShare } from "react-icons/md";

const MeetingRoom = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  const [jiggle, setJiggle] = useState(false);

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
    setTimeout(() => setJiggle(false), 400); // duration must match CSS animation
  };

  return (
    <div className="meeting-room">
      {/* Top Icons */}
      <div className="top-bar">
        <div className="top-left-icon">
          <img src={SecurityIcon} alt="Security Icon" />
        </div>
        <div className="top-right-icon" onClick={openSidebar}>
          <FaBars />
        </div>
      </div>

      {/* Control Bar */}
      <div className="control-bar">
        <button className="control-btn">
          <FaRegCircle className="control-icon" />
        </button>
        <button className="control-btn">
          <FaVideoSlash className="control-icon" />
        </button>
        <button className="control-btn">
          <FaMicrophoneSlash className="control-icon" />
        </button>
        <button className="control-btn end-call">
          <FaPhoneSlash className="control-icon" />
        </button>
        <button className="control-btn">
          <MdOutlineScreenShare className="control-icon" />
        </button>
      </div>

      {/* Right Sidebar */}
      {isSidebarOpen && (
        <div className={`right-sidebar ${jiggle ? "jiggle" : ""}`}>
          {/* Tabs */}
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === "participants" ? "active" : ""}`}
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

          {/* Tab Content */}
          <div className="sidebar-content">
            {activeTab === "participants" ? (
              <div className="tab-panel">
                <p>John Doe</p>
                <p>Jane Smith</p>
                <p>Bob Johnson</p>
              </div>
            ) : (
              <>
                <div className="tab-panel chat-panel">
                  <p><strong>John:</strong> Hello!</p>
                  <p><strong>You:</strong> Hi everyone!</p>
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

          {/* Bottom Controls */}
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
