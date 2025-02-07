/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { GetNewRender, getNewRender } from "../../../../api/prompt/get-new-render";
import { useMutation } from "@tanstack/react-query";

const getUpdatedRender = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  let updatedRender = "";
  if (iframeRef.current) {
    const iframeDoc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;
    updatedRender = iframeDoc?.documentElement?.outerHTML || "";
  }
  return updatedRender;
};

const useHome = () => {
  const { mutateAsync, isPending, error, data } = useMutation<
    any,
    Error,
    GetNewRender
  >({
    mutationFn: getNewRender,
  });
  const errorMessage = error?.message;
  const render = data?.render;
  const [prompt, setPrompt] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentRender = getUpdatedRender(iframeRef);
      await mutateAsync({ prompt, currentRender });
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
    render,
  };
};

export { useHome };
