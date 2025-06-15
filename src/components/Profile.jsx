import React, { useContext, useState } from "react";
import "./Profile.css";
import { UserContext } from "../context/UserContext";



const Profile = () => {
  const { user } = useContext(UserContext);

  

  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    bio: user.bio || "Tar jene ki? :)",
  });

  const [profilePic, setProfilePic] = useState("/profile-pic.jpg");

  const handleEdit = (field) => setEditField(field);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlurOrEnter = (e) => {
    if (e.type === "blur" || e.key === "Enter") {
      setEditField(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <label htmlFor="profile-upload">
            <img src={profilePic} alt="User" className="clickable-image" />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="profile-details">
          <div className="row">
            <div className="field">
              <label>Full name</label>
              <div className="value-edit">
                {editField === "fullName" ? (
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleBlurOrEnter}
                    autoFocus
                  />
                ) : (
                  <>
                    <span>{formData.fullName}</span>
                    <img
                      src="/edit-icon.svg"
                      alt="edit"
                      onClick={() => handleEdit("fullName")}
                    />
                  </>
                )}
              </div>

              <label>Username</label>
              <div className="value-edit">
                {editField === "username" ? (
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleBlurOrEnter}
                    autoFocus
                  />
                ) : (
                  <>
                    <span>{formData.username}</span>
                    <img
                      src="/edit-icon.svg"
                      alt="edit"
                      onClick={() => handleEdit("username")}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="field">
              <label>Email</label>
              <div className="value-edit">
                {editField === "email" ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleBlurOrEnter}
                    autoFocus
                  />
                ) : (
                  <>
                    <span>{formData.email}</span>
                    <img
                      src="/edit-icon.svg"
                      alt="edit"
                      onClick={() => handleEdit("email")}
                    />
                  </>
                )}
              </div>

              <label>Phone number</label>
              <div className="value-edit">
                {editField === "phone" ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleBlurOrEnter}
                    autoFocus
                  />
                ) : (
                  <>
                    <span>{formData.phone}</span>
                    <img
                      src="/edit-icon.svg"
                      alt="edit"
                      onClick={() => handleEdit("phone")}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bio">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              onBlur={handleBlurOrEnter}
              onKeyDown={handleBlurOrEnter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
