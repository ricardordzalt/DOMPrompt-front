import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ChatInput = () => {
  return (
    <div className={styles.container}>
      <label htmlFor="chat" className={styles.chatLabel}>Let's create!</label>
      <form action="/action_page.php" className={styles.inputContainer}>
        <input
          type="text"
          id="chat"
          name="chat"
          placeholder="Message ChatRender"
          className={styles.chatInput}
        />
        <span className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            <FontAwesomeIcon
              icon={faArrowRight}
              color="var(--white-color)"
              fixedWidth
              className={styles.rightIcon}
            />
          </button>
        </span>
      </form>
    </div>
  );
};

export default ChatInput;
