/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import {
  GetNewRender,
  getNewRender,
} from "../../../../api/prompt/get-new-render";
import { useMutation } from "@tanstack/react-query";
import { useCheckAuth } from "./use-check-auth";
import { SwiperClass } from "swiper/react";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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
  const swiperRef = useRef<SwiperClass>(null);
  const queryResult = useCheckAuth();
  const {
    data: checkAuthData,
    // error: checkAuthError,
    // isPending: isCheckAuthPending,
  } = queryResult;
  const initialIsAuthModalOpen = !checkAuthData?.user;
  const { mutateAsync, isPending, error, data } = useMutation<
    any,
    Error,
    GetNewRender
  >({
    mutationFn: getNewRender,
  });
  const errorMessage = error?.message;
  const render = data?.render;
  const [{ prompt, email, otp }, setState] = useState({
    prompt: "",
    email: "",
    otp: "",
  });

  const setPrompt = (prompt: string) =>
    setState((prev) => ({ ...prev, prompt }));
  const setEmail = (email: string) => setState((prev) => ({ ...prev, email }));
  const setOtp = (otp: string) => setState((prev) => ({ ...prev, otp }));

  const [
    isAuthModalOpen, 
    // setIsAuthModalOpen
  ] = useState(
    initialIsAuthModalOpen
  );
  // const closeModal = () => setIsAuthModalOpen(false);
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

  const onChangePrompt: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPrompt(e?.target.value);

  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e?.target.value);

  const onChangeOtp: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setOtp(e?.target.value);

  const onSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    swiperRef.current?.slideNext();
  };

  const onPressBack = () => {
    swiperRef.current?.slidePrev();
  };

  const onSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();    
    console.log("🚀 ~ onSubmitOtp ~ onSubmitOtp:")
  };

  const onClickResendOtp = () => {};

  const submitEmailDisabled = !isValidEmail(email);

  const submitOtpDisabled = otp.length < 6;

  return {
    handleSend,
    onChangePrompt,
    isPending,
    prompt,
    errorMessage,
    iframeRef,
    render,
    isAuthModalOpen,
    onSubmitEmail,
    onSubmitOtp,
    onClickResendOtp,
    onPressBack,
    email,
    onChangeEmail,
    otp,
    onChangeOtp,
    submitEmailDisabled,
    submitOtpDisabled,
    swiperRef,
  };
};

export { useHome };
