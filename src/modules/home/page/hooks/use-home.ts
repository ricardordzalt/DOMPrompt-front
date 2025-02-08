/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import {
  GetNewRender,
  getNewRender,
} from "../../../../api/prompt/get-new-render";
import { useMutation } from "@tanstack/react-query";
import { useCheckAuth } from "./use-check-auth";
import { SwiperClass } from "swiper/react";
import {
  RequestOtpCode,
  requestOtpCode,
} from "../../../../api/auth/request-otp-code";
import {
  VerifyOtpCode,
  verifyOtpCode,
} from "../../../../api/auth/verify-otp-code";

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
  const onPressBack = () => {
    swiperRef.current?.slidePrev();
  };
  const queryResult = useCheckAuth();
  const {
    data: checkAuthData,
    // error: checkAuthError,
    // isPending: isCheckAuthPending,
  } = queryResult;
  const initialIsAuthModalOpen = !checkAuthData?.user;
  const [{ prompt, email, otp, isAuthModalOpen }, setState] = useState({
    prompt: "",
    email: "",
    otp: "",
    isAuthModalOpen: initialIsAuthModalOpen,
  });

  const setPrompt = (prompt: string) =>
    setState((prev) => ({ ...prev, prompt }));
  const setEmail = (email: string) => setState((prev) => ({ ...prev, email }));
  const setOtp = (otp: string) => setState((prev) => ({ ...prev, otp }));
  const setIsAuthModalOpen = (isAuthModalOpen: boolean) =>
    setState((prev) => ({ ...prev, isAuthModalOpen }));

  // New Render call
  const {
    mutateAsync: getNewRenderCall,
    isPending,
    error,
    data,
  } = useMutation<any, Error, GetNewRender>({
    mutationFn: getNewRender,
  });

  const errorMessage = error?.message;
  const render = data?.render;

  // Request OTP code call
  const {
    mutateAsync: requestOtpCodeCall,
    // isPending: isRequestOtpPending,
    // error: requestOtpError,
    // data: requestOtpData,
  } = useMutation<any, Error, RequestOtpCode>({
    mutationFn: requestOtpCode,
    onSuccess: (data) => {
      if (data?.status === 200) {
        swiperRef.current?.slideNext();
      }
    },
  });

  // Verify OTP code call
  const {
    mutateAsync: vrifyOtpCodeCall,
    // isPending: isVerifyOtpPending,
    // error: virifyOtpError,
    data: virifyOtpData,
  } = useMutation<any, Error, VerifyOtpCode>({
    mutationFn: verifyOtpCode,
    onSuccess: (data) => {
      if (data?.status === 200) {
        setIsAuthModalOpen(false);
      }
    },
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentRender = getUpdatedRender(iframeRef);
      await getNewRenderCall({ prompt, currentRender });
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

  const onSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestOtpCodeCall({ email });
  };

  const onSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await vrifyOtpCodeCall({ email, otpCode: otp });
  };

  const onClickResendOtp = () => {};

  const submitEmailDisabled = !isValidEmail(email);
  const submitOtpDisabled = otp.length < 6;

  const emailErrorMessage = (() => {
    if (!!email && submitEmailDisabled) {
      return "Invalid e-mail";
    }
    return;
  })();

  const otpErrorMessage = (() => {
    if (!!otp && submitOtpDisabled) {
      return "Invalid code";
    }
    if (virifyOtpData?.error && typeof virifyOtpData?.error === "string") {
      return virifyOtpData?.error;
    }
    return;
  })();

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
    emailErrorMessage,
    otpErrorMessage,
    swiperRef,
  };
};

export { useHome };
