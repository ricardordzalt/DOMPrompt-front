/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { SwiperClass } from "swiper/react";

import {
  GetNewRender,
  getNewRender,
} from "../../../../api/prompt/get-new-render";
import { useCheckAuth } from "./use-check-auth";
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

  // Auth check
  const queryResult = useCheckAuth();
  const {
    data: checkAuthData,
    isSuccess: isCheckAuthSuccess,
    // error: checkAuthError,
    // isPending: isCheckAuthPending,
  } = queryResult;

  // State
  const [{ prompt, email, otp, isAuthModalOpen }, setState] = useState({
    prompt: "",
    email: "",
    otp: "",
    isAuthModalOpen: false,
  });

  // Handlers for state
  const setPrompt = (prompt: string) =>
    setState((prev) => ({ ...prev, prompt }));

  const setEmail = (email: string) => setState((prev) => ({ ...prev, email }));

  const setOtp = (otp: string) => setState((prev) => ({ ...prev, otp }));

  const setIsAuthModalOpen = (isAuthModalOpen: boolean) =>
    setState((prev) => ({ ...prev, isAuthModalOpen }));

  // Effects
  useEffect(() => {
    if (checkAuthData?.status === 200 && isCheckAuthSuccess) {
      setIsAuthModalOpen(false);
    } else if (checkAuthData?.status !== 200 && isCheckAuthSuccess) {
      setIsAuthModalOpen(true);
    }
  }, [checkAuthData?.status, isCheckAuthSuccess]);

  // Mutations
  const {
    mutateAsync: getNewRenderCall,
    isPending: isGetNewRenderPending,
    error: getNewRenderError,
    data: getNewRenderData,
  } = useMutation<any, Error, GetNewRender>({
    mutationFn: getNewRender,
  });

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

  const {
    mutateAsync: verifyOtpCodeCall,
    // isPending: isVerifyOtpPending,
    // error: verifyOtpError,
    data: verifyOtpData,
  } = useMutation<any, Error, VerifyOtpCode>({
    mutationFn: verifyOtpCode,
    onSuccess: (data) => {
      if (data?.status === 200) {
        setIsAuthModalOpen(false);
      }
    },
  });

  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handlers
  const onPressBack = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentRender = getUpdatedRender(iframeRef);
      await getNewRenderCall({ prompt, currentRender });
      setPrompt(""); // Reset prompt after success
    } catch (err) {
      console.error("Error occurred:", err);
    }
  };

  const onChangePrompt: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPrompt(e.target.value);

  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target.value);

  const onChangeOtp: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setOtp(e.target.value);

  const onSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestOtpCodeCall({ email });
  };

  const onSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyOtpCodeCall({ email, otpCode: otp });
  };

  const onClickResendOtp = () => {};

  // Computed / Derived states
  const submitEmailDisabled = !isValidEmail(email);
  const submitOtpDisabled = otp.length < 6;
  const errorMessage = getNewRenderError?.message;
  const render = getNewRenderData?.render;

  const emailErrorMessage = (() => {
    if (email && submitEmailDisabled) {
      return "Invalid e-mail";
    }
    return;
  })();

  const otpErrorMessage = (() => {
    if (otp && submitOtpDisabled) {
      return "Invalid code";
    }
    if (verifyOtpData?.error && typeof verifyOtpData.error === "string") {
      return verifyOtpData.error;
    }
    return;
  })();

  return {
    handleSend,
    onChangePrompt,
    isGetNewRenderPending,
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
