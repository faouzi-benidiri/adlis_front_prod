import React, { useState } from "react";
import EditProfileForm from "./EditProfileForm";

const DisplayProfileInfo = ({ profileData, onEdit }) => {
  const [activeField, setActiveField] = useState(null);

  // Handles the click event when editing a field
  const handleEditField = (field) => {
    setActiveField(field);
  };

  // Handles the cancel edit event
  const handleCancelEdit = () => {
    setActiveField(null);
  };

  // Handles the save edit event
  const handleSaveEdit = (field, updatedValue, currentPassword) => {
    onEdit(field, updatedValue, currentPassword);
    setActiveField(null);
  };

  return (
    <div className="profile-info-container">
      <h2 className="profile-info-heading">Informations du profil</h2>
      <div className="profile-info-row">
        <div className="profile-info-card">
          <p className="profile-info-label">Nom d'utilisateur:</p>
          <p className="profile-info-value">{profileData.username}</p>
          {activeField !== "username" && (
            <button
              className="profile-info-edit-button"
              onClick={() => handleEditField("username")}
            >
              Modifier
            </button>
          )}
          {activeField === "username" && (
            <EditProfileForm
              field="username"
              defaultValue={profileData.username}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
        <div className="profile-info-card">
          <p className="profile-info-label">Email:</p>
          <p className="profile-info-value">{profileData.email}</p>
          {activeField !== "email" && (
            <button
              className="profile-info-edit-button"
              onClick={() => handleEditField("email")}
            >
              Modifier
            </button>
          )}
          {activeField === "email" && (
            <EditProfileForm
              field="email"
              defaultValue={profileData.email}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
        <div className="profile-info-card">
          <p className="profile-info-label">Mot de passe:</p>
          {activeField !== "password" && (
            <button
              className="profile-info-edit-button"
              onClick={() => handleEditField("password")}
            >
              Modifier
            </button>
          )}
          {activeField === "password" && (
            <EditProfileForm
              field="password"
              defaultValue="*************"
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              requireCurrentPassword
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayProfileInfo;
