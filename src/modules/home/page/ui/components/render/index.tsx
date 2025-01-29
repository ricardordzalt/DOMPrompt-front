import styles from "./index.module.css";

interface RenderProps {
  html: string;
  ref: React.Ref<HTMLIFrameElement>;
}

const Render = ({ html, ref }: RenderProps) => {
  return (
    <iframe
      ref={ref}
      title="HTML Renderer"
      sandbox="allow-same-origin allow-scripts allow-forms"
      srcDoc={html}
      className={styles.container}
    />
  );
};

export { Render };
