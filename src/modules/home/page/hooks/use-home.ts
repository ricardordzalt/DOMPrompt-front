/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { GetNewHtml, getNewHtml } from "../../../../api/prompt/get-new-html";
import { useMutation } from "@tanstack/react-query";

const getUpdatedHTML = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  let updatedHTML = "";
  if (iframeRef.current) {
    const iframeDoc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;
    updatedHTML = iframeDoc?.documentElement?.outerHTML || "";
  }
  return updatedHTML;
};

const useHome = () => {
  const { mutateAsync, isPending, error, data } = useMutation<
    any,
    Error,
    GetNewHtml
  >({
    mutationFn: getNewHtml,
  });
  const errorMessage = error?.message;
  const renderedHTML = data?.html;
  const [prompt, setPrompt] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentHTML = getUpdatedHTML(iframeRef);
      await mutateAsync({ prompt, currentHTML });
      setPrompt(""); // Reset prompt after success
    } catch (e) {
      console.error("Error occurred:", e);
    }
  };

  const onPromptChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPrompt(e?.target.value);

  return {
    handleSend,
    onPromptChange,
    isPending,
    prompt,
    errorMessage,
    iframeRef,
    renderedHTML,
  };
};

export { useHome };
