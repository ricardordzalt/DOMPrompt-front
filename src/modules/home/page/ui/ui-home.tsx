/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./index.module.css";
import { SideBar } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import ChatInput from "./components/chat-input";
import RenderButtons from "./components/render-buttons";
import { Render } from "./components/render";

const UIHome = ({
  handleSend,
  setPrompt,
  isPending,
  prompt,
  error,
  iframeRef,
  renderedHTML,
}: any) => {
  return (
    <span className={styles.container}>
      <SideBar />
      <div className={styles.rightContainer}>
        <span className={styles.topbarContainerMobile}>
          <TopBar />
        </span>
        <span className={styles.contentContainer}>
          <span className={styles.topbarContainerDesktop}>
            <TopBar />
          </span>
          <span className={styles.chatContainer}>
            <ChatInput />
          </span>
          <span className={styles.buttonsContainer}>
            <RenderButtons />
          </span>
          <span className={styles.renderContainer}>
            <Render />
          </span>
        </span>
      </div>
    </span>
  );
};

export { UIHome };
