import styles from "./index.module.css";

interface LoaderProps {
  type?: "puff" | "moon";
}

const Loader = ({ type = "moon" }: LoaderProps) => {
  if (type === "moon") {
    return <div className={styles.moonLoader}></div>;
  }

  if (type === "puff") {
    return (
      <div className={styles.puffLoader}>
        <div className={styles.puff}></div>
        <div className={styles.puff}></div>
      </div>
    );
  }

  return null;
};

export default Loader;
