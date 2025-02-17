import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ChatInputProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  disabled?: boolean;
  buttonDisabled?: boolean;
  errorMessage: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  footer?: React.ReactNode;
}

const ChatInput = ({
  onSubmit,
  onChange,
  value,
  disabled,
  buttonDisabled,
  errorMessage,
  placeholder = "Message ChatRender",
  label = "Let's create!",
  maxLength,
  footer,
}: ChatInputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor="chat" className={styles.chatLabel}>
        {label}
      </label>
      <form className={styles.inputContainer} onSubmit={onSubmit}>
        <input
          type="text"
          id="chat"
          name="chat"
          placeholder={placeholder}
          className={styles.chatInput}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
        />
        <span className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={buttonDisabled}
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
        {footer ? (
          <span className={styles.footerContainer}>{footer}</span>
        ) : null}
      </form>
    </div>
  );
};

export default ChatInput;
