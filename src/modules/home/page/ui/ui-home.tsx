/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./index.module.css";
import { SideBar } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import ChatInput from "./components/chat-input";
import RenderButtons from "./components/render-buttons";
import { Render } from "./components/render";
import { AuthModal } from "./components/auth-modal";
import Loader from "../../../../common/components/loader";

const UIHome = ({
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
  onPressBack,
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
  onClickRenders,
  onClickLogout,
  screenLoading,
  swiperRef,
}: any) => {
  if (screenLoading) {
    return <Loader />;
  }
  return (
    <>
      <span className={styles.container}>
        <SideBar
          onClickNewRender={onClickNewRender}
          onClickRenders={onClickRenders}
        />
        <div className={styles.rightContainer}>
          <span className={styles.topbarContainerMobile}>
            <TopBar
              onClickNewRender={onClickNewRender}
              onClickRenders={onClickRenders}
              onClickLogout={onClickLogout}
            />
          </span>
          <span className={styles.contentContainer}>
            <span className={styles.topbarContainerDesktop}>
              <TopBar
                onClickNewRender={onClickNewRender}
                onClickRenders={onClickRenders}
                onClickLogout={onClickLogout}
              />
            </span>
            <span className={styles.chatContainer}>
              <ChatInput
                onSubmit={onSubmitPrompt}
                onChange={onChangePrompt}
                value={prompt}
                disabled={isGetNewRenderPending}
                buttonDisabled={isGetNewRenderPending}
                errorMessage={errorMessage}
              />
            </span>
            <span className={styles.buttonsContainer}>
              <RenderButtons
                onClickCopyRender={onClickCopyRender}
                onClickSaveRender={onClickSaveRender}
              />
            </span>
            <span className={styles.renderContainer}>
              <Render
                render={render}
                ref={iframeRef}
                isLoading={isGetNewRenderPending}
              />
            </span>
          </span>
        </div>
      </span>
      <AuthModal
        isOpen={isAuthModalOpen}
        onSubmitEmail={onSubmitEmail}
        onSubmitOtp={onSubmitOtp}
        onClickResendOtp={onClickResendOtp}
        onPressBack={onPressBack}
        email={email}
        onChangeEmail={onChangeEmail}
        otp={otp}
        onChangeOtp={onChangeOtp}
        submitEmailDisabled={submitEmailDisabled}
        submitOtpDisabled={submitOtpDisabled}
        emailErrorMessage={emailErrorMessage}
        otpErrorMessage={otpErrorMessage}
        isRequestOtpPending={isRequestOtpPending}
        isVerifyOtpPending={isVerifyOtpPending}
        swiperRef={swiperRef}
      />
    </>
  );
};

export { UIHome };
