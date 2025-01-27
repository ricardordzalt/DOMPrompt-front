/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SideBar } from "./components/sidebar";
import { TopBar } from "./components/topbar";

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
    <span style={{display: 'flex', flex: 1}}>
      <SideBar />
      <TopBar />
    </span>
  );
};

export { UIHome };
