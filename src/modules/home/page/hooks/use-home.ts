/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { SwiperClass } from "swiper/react";

import {
  GetNewRender,
  getNewRender,
} from "../../../../api/renders/get-new-render";
import { useCheckAuth } from "./use-check-auth";
import {
  RequestOtpCode,
  requestOtpCode,
} from "../../../../api/auth/request-otp-code";
import {
  VerifyOtpCode,
  verifyOtpCode,
} from "../../../../api/auth/verify-otp-code";
import { useNavigate } from "react-router";
import { logOut } from "../../../../api/auth/log-out";
import { getMyRenders } from "../../../../api/renders/get-my-renders";
import { SaveRender, saveRender } from "../../../../api/renders/save-render";

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
  const authSwiperRef = useRef<SwiperClass>(null);
  const myRendersSwiperRef = useRef<SwiperClass>(null);

  const navigate = useNavigate();

  // Auth check
  const queryResult = useCheckAuth();
  const {
    data: checkAuthData,
    isSuccess: isCheckAuthSuccess,
    // error: checkAuthError,
    // isPending: isCheckAuthPending,
  } = queryResult;

  // State
  const [
    { prompt, email, otp, render, isAuthModalOpen, isMyRendersModalOpen },
    setState,
  ] = useState({
    prompt: "",
    email: "",
    otp: "",
    render: "",
    isAuthModalOpen: false,
    isMyRendersModalOpen: false,
  });

  // Handlers for state

  const setPrompt = (prompt: string) =>
    setState((prev) => ({ ...prev, prompt }));

  const setEmail = (email: string) => setState((prev) => ({ ...prev, email }));

  const setOtp = (otp: string) => setState((prev) => ({ ...prev, otp }));

  const setRender = (render: string) =>
    setState((prev) => ({ ...prev, render }));

  const setIsAuthModalOpen = (isAuthModalOpen: boolean) =>
    setState((prev) => ({ ...prev, isAuthModalOpen }));

  const setIsMyRendersModalOpen = (isMyRendersModalOpen: boolean) =>
    setState((prev) => ({ ...prev, isMyRendersModalOpen }));

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
  } = useMutation<any, Error, GetNewRender>({
    mutationFn: getNewRender,
    onSuccess: (getNewRenderData) => {
      if (getNewRenderData?.status === 200) {
        setRender(getNewRenderData?.render);
      }
      if (getNewRenderData?.status === 401) {
        setIsAuthModalOpen(true);
      }
    },
  });

  const {
    mutateAsync: requestOtpCodeCall,
    isPending: isRequestOtpPending,
    // error: requestOtpError,
    // data: requestOtpData,
  } = useMutation<any, Error, RequestOtpCode>({
    mutationFn: requestOtpCode,
    onSuccess: (data) => {
      if (data?.status === 200) {
        authSwiperRef.current?.slideNext();
      }
    },
  });

  const {
    mutateAsync: verifyOtpCodeCall,
    isPending: isVerifyOtpPending,
    // error: verifyOtpError,
    data: verifyOtpData,
  } = useMutation<any, Error, VerifyOtpCode>({
    mutationFn: verifyOtpCode,
    onSuccess: (data) => {
      if (data?.status === 200) {
        setIsAuthModalOpen(false);
        setEmail("");
        setOtp("");
      }
    },
  });

  const {
    mutateAsync: logOutCall,
    isPending: isLogOutPending,
    // error: logOutError,
    // data: logOutData,
  } = useMutation<any, Error>({
    mutationFn: logOut,
    onSuccess: (data) => {
      if (data?.status === 200) {
        setIsAuthModalOpen(true);
        setPrompt("");
        setRender("");
      }
    },
  });

  const {
    mutateAsync: getMyRendersCall,
    isPending: isGetMyRendersPending,
    // error: getNewRenderError,
    data: myRendersData,
  } = useMutation<any, Error>({
    mutationFn: getMyRenders,
  });

  const {
    mutateAsync: saveRenderCall,
    isPending: isSaveRenderPending,
    // error: saveRenderError,
    // data: saveRenderData,
  } = useMutation<any, Error, SaveRender>({
    mutationFn: saveRender,
    onSuccess: async (data) => {
      if (data?.status === 200) {
        await getMyRendersCall();
        setPrompt("");
        setRender("");
        setIsMyRendersModalOpen(true);
      }
    },
  });

  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handlers
  const onClickBackAuth = () => {
    authSwiperRef.current?.slidePrev();
  };

  const onSubmitPrompt = async (e: React.FormEvent) => {
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
  const onClickCopyRender: React.ChangeEventHandler<HTMLInputElement> = () => {
    // Copy the text inside the text field
    const clipboadText = getUpdatedRender(iframeRef);
    navigator.clipboard.writeText(clipboadText);
  };
  const onClickSaveRender = async () => {
    if (render) {
      await saveRenderCall({ render });
    }
  };

  const onClickNewRender = () => {
    // Forces redirect to this page while reseting the component
    navigate("/notexistingpage", { replace: true });
    setTimeout(() => navigate("/", { replace: true }), 1);
  };

  const onClickMyRenders = async () => {
    setIsMyRendersModalOpen(true);
    await getMyRendersCall();
  };

  const onClickLogout: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    e.preventDefault();
    await logOutCall();
  };

  const onClickBackMyRenders = () => {
    const currentSlideIndex = myRendersSwiperRef.current?.realIndex;
    console.log(
      "🚀 ~ onClickBackMyRenders ~ currentSlideIndex:",
      currentSlideIndex
    );
    if (currentSlideIndex === 0) {
      setIsMyRendersModalOpen(false);
    } else {
      myRendersSwiperRef.current?.slidePrev();
    }
  };

  const onClickRender = (render: { code: string }) => {
    console.log("🚀 ~ onClickRender ~ render:", render);
    setIsMyRendersModalOpen(false);
    setRender(render?.code);
  };

  // Computed / Derived states
  const submitEmailDisabled = !isValidEmail(email);
  const submitOtpDisabled = otp.length < 6;
  const errorMessage = getNewRenderError?.message;
  const screenLoading = isLogOutPending || isSaveRenderPending;
  const myRenders = myRendersData?.renders;

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
    onSubmitPrompt,
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
    onClickBackAuth,
    email,
    onChangeEmail,
    otp,
    onChangeOtp,
    submitEmailDisabled,
    submitOtpDisabled,
    emailErrorMessage,
    otpErrorMessage,
    isRequestOtpPending,
    isVerifyOtpPending,
    onClickCopyRender,
    onClickSaveRender,
    onClickNewRender,
    onClickMyRenders,
    onClickLogout,
    screenLoading,
    isMyRendersModalOpen,
    onClickBackMyRenders,
    isGetMyRendersPending,
    myRenders,
    onClickRender,
    authSwiperRef,
    myRendersSwiperRef,
  };
};

export { useHome };
