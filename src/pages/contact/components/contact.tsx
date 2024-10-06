// unda gavaketot useState-is gareshe
import styles from "./contact.module.css";
const Contact: React.FC = () => {
  const formValues = {
    name: "",
    surname: "",
    email: "",
    message: "",
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    formValues[name as keyof typeof formValues] = value;
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <div className={styles["contact-container"]}>
      <form id="nameform" onSubmit={handleOnSubmit}>
        <label>
          Enter your name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Enter your surname:
          <input type="text" name="surname" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Enter your email:
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Message
          <textarea
            name="message"
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
        <br />
        <button className={styles["submit-btn"]} type="submit" value="Submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
