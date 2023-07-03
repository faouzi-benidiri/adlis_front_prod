import React from "react";
import { useForm } from "react-hook-form";
import "../style/Form.css";
import { Link } from "react-router-dom";

const Form = (props) => {
  const handleError = (errors) => {};
  const {
    username,
    email,
    password,
    passwordConfirmation,
    Conditions,
    button,
    usernamePlaceholder,
    emailPlaceholder,
    passwordConfirmationPlaceholder,
    page,
  } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSubmitRequest = (data) => {
    props.sendData(data);
  };

  const validOptions = {
    username: { required: "pseudo requis" },
    email: {
      required: "Email requis",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "l'adresse email n'est pas valide",
      },
    },
    password: {
      required: "mot de passe requis",
      minLength: {
        value: 12,
        message: "mot de passe doit avoir minimum 12 caracteres",
      },
    },
    password_confirmation: {
      validate: (value) =>
        value === watch("password") || "Les mots de passe ne correspondent pas",
    },
    accept_conditions: {
      required: "Veuillez accepter les conditions d'utilisation",
    },
  };

  return (
    <>
      <div class="custom-container">
        <div class="custom-form-container">
          <form
            class="custom-form"
            onSubmit={handleSubmit(handleSubmitRequest, handleError)}
          >
            {username && (
              <div class="custom-form-group">
                <label for="custom-username">{username}</label>
                <input
                  type="text"
                  id="custom-username"
                  min="3"
                  max="40"
                  placeholder={usernamePlaceholder}
                  {...register("username", validOptions.username)}
                />
                <small class="custom-text-danger">
                  {errors?.username && errors.username.message}
                </small>
              </div>
            )}

            {email && (
              <div class="custom-form-group">
                <label for="custom-email">{email}</label>
                <input
                  max="40"
                  type="email"
                  id="custom-email"
                  placeholder={emailPlaceholder}
                  {...register("email", validOptions.email)}
                />
                <small class="custom-text-danger">
                  {errors?.email && errors.email.message}
                </small>
              </div>
            )}

            {password && (
              <div class="custom-form-group">
                <label for="custom-password">{password}</label>
                <input
                  max="40"
                  type="password"
                  id="custom-password"
                  {...register("password", validOptions.password)}
                />

                {page === "signin" && errors.password && (
                  <>
                    {errors.password.type === "required" && (
                      <small class="custom-text-danger">
                        mot de passe requis
                      </small>
                    )}
                  </>
                )}
              </div>
            )}

            {passwordConfirmation && (
              <div class="custom-form-group">
                <label for="custom-passwordConfirmation">
                  {passwordConfirmation}
                </label>
                <input
                  type="password"
                  max="40"
                  id="custom-passwordConfirmation"
                  placeholder={passwordConfirmationPlaceholder}
                  {...register(
                    "password_confirmation",
                    validOptions.password_confirmation
                  )}
                />
                <small class="custom-text-danger">
                  {errors?.password_confirmation &&
                    errors.password_confirmation.message}
                </small>
              </div>
            )}

            {Conditions && (
              <div class="custom-form-group">
                <input
                  type="checkbox"
                  max="40"
                  id="custom-accept_conditions"
                  {...register(
                    "accept_conditions",
                    validOptions.accept_conditions
                  )}
                />
                <label for="custom-accept_conditions">{Conditions}</label>
                <small class="custom-text-danger">
                  {errors?.accept_conditions &&
                    errors.accept_conditions.message}
                </small>
              </div>
            )}

            {button && (
              <div class="custom-form-group">
                <button type="submit" class="custom-submit-button">
                  {button}
                </button>
              </div>
            )}
          </form>
          {page === "signin" && (
            <div class="custom-signup-link">
              <span>
                <h6>pas encore enregistré ?</h6>
                <Link to="/signup">Sign up</Link>
              </span>
              <span>
                <h6>mot de passe oublié ?</h6>
                <Link to="/resetpassword">Forgot password</Link>
              </span>
            </div>
          )}

          {page === "signup" && (
            <>
              <h6>déjà enregistré ?</h6>
              <Link to="/signin">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
