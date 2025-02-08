/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./index.module.css";
import { SideBar } from "./components/sidebar";
import { TopBar } from "./components/topbar";
import ChatInput from "./components/chat-input";
import RenderButtons from "./components/render-buttons";
import { Render } from "./components/render";
import { AuthModal } from "./components/auth-modal";

const UIHome = ({
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
}: any) => {
  return (
    <>
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
              <ChatInput
                onSubmit={handleSend}
                onChange={onChangePrompt}
                value={prompt}
                disabled={isPending}
                buttonDisabled={isPending}
                errorMessage={errorMessage}
              />
            </span>
            <span className={styles.buttonsContainer}>
              <RenderButtons />
            </span>
            <span className={styles.renderContainer}>
              <Render html={render} ref={iframeRef} />
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
        swiperRef={swiperRef}
      />
    </>
  );
};

export { UIHome };
