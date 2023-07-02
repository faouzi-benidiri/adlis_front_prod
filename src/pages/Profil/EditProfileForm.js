import React from "react";
import { useForm } from "react-hook-form";

const EditProfileForm = ({ field, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSaveClick = (data) => {
    onSave(field, data.updatedValue, data.current_password);
  };

  const validationOptions = {
    username: {
      required: "Pseudo requis",
    },
    email: {
      required: "Email requis",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "L'adresse email n'est pas valide",
      },
    },
    email_confirmation: {
      validate: (value) =>
        value === watch("updatedValue") || "Les valeurs ne correspondent pas",
    },
    password: {
      required: "Mot de passe requis",
      minLength: {
        value: 12,
        message: "Le mot de passe doit comporter au moins 12 caractères",
      },
    },
    current_password: {
      required: "Mot de passe actuel requis",
      minLength: {
        value: 12,
        message: "Le mot de passe doit comporter au moins 12 caractères",
      },
    },
    password_confirmation: {
      validate: (value) =>
        value === watch("updatedValue") || "Les valeurs ne correspondent pas",
    },
  };

  return (
    <form
      className="edit-profile-form-container"
      onSubmit={handleSubmit(handleSaveClick)}
    >
      {field === "username" && (
        <>
          <label className="edit-profile-label">Nouveau pseudo:</label>
          <input
            type="text"
            {...register("updatedValue", validationOptions.username)}
            className="edit-profile-input"
          />
          {errors.updatedValue && (
            <p className="edit-profile-error-message">
              {errors.updatedValue.message}
            </p>
          )}
        </>
      )}

      {field === "password" && (
        <>
          <label className="edit-profile-label">Mot de passe actuel:</label>
          <input
            type="password"
            {...register(
              "current_password",
              validationOptions.current_password
            )}
            className="edit-profile-input"
          />
          {errors.current_password && (
            <p className="edit-profile-error-message">
              {errors.current_password.message}
            </p>
          )}

          <label className="edit-profile-label">Nouveau mot de passe:</label>
          <input
            type="password"
            {...register("updatedValue", validationOptions.password)}
            className="edit-profile-input"
          />
          {errors.updatedValue && (
            <p className="edit-profile-error-message">
              {errors.updatedValue.message}
            </p>
          )}

          <label className="edit-profile-label">
            Confirmer le nouveau mot de passe:
          </label>
          <input
            type="password"
            {...register(
              "password_confirmation",
              validationOptions.password_confirmation
            )}
            className="edit-profile-input"
          />
          {errors.password_confirmation && (
            <p className="edit-profile-error-message">
              {errors.password_confirmation.message}
            </p>
          )}
        </>
      )}

      {field === "email" && (
        <>
          <label className="edit-profile-label">Nouvel email:</label>
          <input
            type="text"
            {...register("updatedValue", validationOptions.email)}
            className="edit-profile-input"
          />
          {errors.updatedValue && (
            <p className="edit-profile-error-message">
              {errors.updatedValue.message}
            </p>
          )}

          <label className="edit-profile-label">
            Confirmer le nouvel email:
          </label>
          <input
            type="text"
            {...register(
              "email_confirmation",
              validationOptions.email_confirmation
            )}
            className="edit-profile-input"
          />
          {errors.email_confirmation && (
            <p className="edit-profile-error-message">
              {errors.email_confirmation.message}
            </p>
          )}
        </>
      )}

      <button type="submit" className="edit-profile-save-button">
        Enregistrer
      </button>
      <button onClick={onCancel} className="edit-profile-cancel-button">
        Annuler
      </button>
    </form>
  );
};

export default EditProfileForm;
