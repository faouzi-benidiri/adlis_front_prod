import React, { useState, useEffect } from "react";
import "../style/Contact.css";
import Contactmp4 from "../assets/video/contact.mp4";
import { FaArrowUp } from "react-icons/fa";

const Contact = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Vérifier les champs et mettre à jour les messages d'erreur
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
    let hasErrors = false;

    if (name.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        name: "Veuillez entrer votre prénom.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (email.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        email: "Veuillez entrer votre adresse email.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    if (subject.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        subject: "Veuillez entrer le sujet de votre message.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        subject: "",
      }));
    }

    if (message.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        message: "Veuillez entrer votre message.",
      }));
      hasErrors = true;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        message: "",
      }));
    }

    if (!hasErrors) {
      // Envoyer le formulaire
      form.submit();
    }
  };

  const handleErrorMessageClose = (field) => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: "",
    }));
  };

  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="contact-container">
        <div className="contact-video-container">
          <video className="contact-video" autoPlay loop muted>
            <source src={Contactmp4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="contact-form-container">
          <form
            action="https://getform.io/f/b1134f77-cc6e-42bf-89a4-376bbbf20da8"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <div className="contact-input-container">
              <label htmlFor="name">Prénom</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
              {errors.name && (
                <div className="error-message">
                  {errors.name}
                  <button
                    className="error-message-close"
                    onClick={() => handleErrorMessageClose("name")}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="contact-input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              {errors.email && (
                <div className="error-message">
                  {errors.email}
                  <button
                    className="error-message-close"
                    onClick={() => handleErrorMessageClose("email")}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="contact-input-container">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
              />
              {errors.subject && (
                <div className="error-message">
                  {errors.subject}
                  <button
                    className="error-message-close"
                    onClick={() => handleErrorMessageClose("subject")}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="contact-input-container">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                required
                rows="5"
                cols="30"
              ></textarea>
              {errors.message && (
                <div className="error-message">
                  {errors.message}
                  <button
                    className="error-message-close"
                    onClick={() => handleErrorMessageClose("message")}
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
        {showBackToTop && (
          <button
            className="back-to-top-button"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </>
  );
};

export default Contact;
