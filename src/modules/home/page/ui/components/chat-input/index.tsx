import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ChatInput = ({
  onSubmit,
  onChange,
  value,
  disabled,
  errorMessage,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  disabled: boolean;
  errorMessage: string;
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor="chat" className={styles.chatLabel}>
        Let's create!
      </label>
      <form className={styles.inputContainer} onSubmit={onSubmit}>
        <input
          type="text"
          id="chat"
          name="chat"
          placeholder="Message ChatRender"
          className={styles.chatInput}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <span className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={disabled}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              color="var(--white-color)"
              fixedWidth
              className={styles.rightIcon}
            />
          </button>
        </span>
        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
      </form>
    </div>
  );
};

export default ChatInput;
