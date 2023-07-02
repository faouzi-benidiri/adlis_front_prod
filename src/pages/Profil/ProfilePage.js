import React, { useState, useEffect, useCallback } from "react";
import ProfileRequest from "./ProfileRequest";
import DisplayProfileInfo from "./DisplayProfilInfo";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Fetches the profile data from the server
  const fetchProfileData = useCallback(async () => {
    try {
      const data = await ProfileRequest.fetchProfileData();
      setProfileData(data);
    } catch (error) {
      localStorage.clear();
      setProfileData(null);
      navigate("/");
      console.error("Error fetching profile data:", error);
    }
  }, [navigate]);

  // Deletes the user's account
  const deleteProfileData = useCallback(async () => {
    try {
      await ProfileRequest.deleteAccount();
      localStorage.clear();
      setProfileData(null);
      navigate("/");
    } catch (error) {
      localStorage.clear();
      setProfileData(null);
      navigate("/");
      console.error("Error deleting profile data:", error);
    }
  }, [navigate]);

  // Handles the editing of profile fields
  const handleEdit = useCallback(
    async (field, updatedValue, currentPassword) => {
      try {
        switch (field) {
          case "username":
            await ProfileRequest.updateUsername(updatedValue);
            break;
          case "email":
            await ProfileRequest.updateEmail(updatedValue);
            break;
          case "password":
            await ProfileRequest.updatePassword(currentPassword, updatedValue);
            break;
          default:
            break;
        }
        fetchProfileData();
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
    [fetchProfileData]
  );

  // Fetches the profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (!profileData) {
    return <div>Chargement des données du profil...</div>;
  }

  return (
    <div className="profile-card">
      <h1 className="profile-card__title">Votre profil</h1>
      <div className="profile-card__content">
        <DisplayProfileInfo profileData={profileData} onEdit={handleEdit} />
      </div>
      <button className="delete-profile-button" onClick={deleteProfileData}>
        Supprimer mon compte
      </button>
    </div>
  );
};

export default ProfilePage;
