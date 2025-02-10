import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

interface RenderButtonsProps {
  onClickCopyRender: VoidFunction;
  onClickSaveRender: VoidFunction;
}

const RenderButtons = ({
  onClickCopyRender,
  onClickSaveRender,
}: RenderButtonsProps) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={onClickCopyRender}
        title="Copy to clipboard"
        aria-label="Copy this render to clipboard"
      >
        <FontAwesomeIcon
          icon={faCopy}
          color="var(--icon-color)"
          fixedWidth
          className={`${styles.icon} ${styles.firstIcon}`}
        />
      </button>
      <button
        className={styles.button}
        onClick={onClickSaveRender}
        title="Save render"
        aria-label="Save this render on my renders"
      >
        <FontAwesomeIcon
          icon={faFloppyDisk}
          color="var(--icon-color)"
          fixedWidth
          className={styles.icon}
        />
      </button>
    </div>
  );
};

export default RenderButtons;
