// unda gavaketot useState-is gareshe
import { useState } from "react";
import styles from "./contact.module.css";

const Contact: React.FC = () => {
  const [contactinputs, setContactInputs] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "message" && value.length > 800) {
      setErrorMessage("Message should not be longer than 800 letters");
    } else setErrorMessage("");
    setContactInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(contactinputs);
    setContactInputs({
      name: "",
      surname: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className={styles["contact-container"]}>
      <form id="nameform" onSubmit={handleOnSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            name="name"
            value={contactinputs.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Enter your surname:
          <input
            type="text"
            name="surname"
            value={contactinputs.surname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Enter your email:
          <input
            type="email"
            name="email"
            value={contactinputs.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Message
          <textarea
            name="message"
            value={contactinputs.message}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleOnSubmit(
                  event as unknown as React.FormEvent<HTMLFormElement>
                );
              }
            }}
          ></textarea>
        </label>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <br />
        <button className={styles["submit-btn"]} type="submit" value="Submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
