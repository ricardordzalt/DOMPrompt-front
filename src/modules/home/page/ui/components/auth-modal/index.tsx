import Modal from "react-modal";
import styles from "./index.module.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatInput from "../chat-input";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { RefObject } from "react";

Modal.setAppElement("#root");

interface AuthModalProps {
  isOpen: boolean;
  onSubmitEmail: VoidFunction;
  onSubmitOtp: VoidFunction;
  onClickResendOtp: VoidFunction;
  onPressBack: VoidFunction;
  email: string;
  onChangeEmail: VoidFunction;
  otp: string;
  onChangeOtp: VoidFunction;
  submitEmailDisabled: boolean;
  submitOtpDisabled: boolean;
  emailErrorMessage: string;
  otpErrorMessage: string;
  swiperRef: RefObject<SwiperClass>;
}

interface EmailSlideProps {
  email: string;
  onChangeEmail: VoidFunction;
  onSubmitEmail: VoidFunction;
  submitEmailDisabled: boolean;
  emailErrorMessage: string;
}

interface OtpSlideProps {
  otp: string;
  onChangeOtp: VoidFunction;
  onSubmitOtp: VoidFunction;
  onClickResendOtp: VoidFunction;
  onPressBack: VoidFunction;
  submitOtpDisabled: boolean;
  otpErrorMessage: string;
}

const AuthModal = ({
  isOpen,
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
}: AuthModalProps) => {
  return (
    <Modal
      contentLabel="Example Modal"
      className={styles.authModal}
      overlayClassName={styles.authModalOverlay}
      isOpen={isOpen}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: false, enabled: true }}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        className={styles.authSwiper}
        allowTouchMove={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <EmailSlide
            email={email}
            onChangeEmail={onChangeEmail}
            onSubmitEmail={onSubmitEmail}
            submitEmailDisabled={submitEmailDisabled}
            emailErrorMessage={emailErrorMessage}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OtpSlide
            otp={otp}
            onChangeOtp={onChangeOtp}
            onSubmitOtp={onSubmitOtp}
            onClickResendOtp={onClickResendOtp}
            onPressBack={onPressBack}
            submitOtpDisabled={submitOtpDisabled}
            otpErrorMessage={otpErrorMessage}
          />
        </SwiperSlide>
      </Swiper>
    </Modal>
  );
};

const EmailSlide = ({
  email,
  onChangeEmail,
  onSubmitEmail,
  submitEmailDisabled,
  emailErrorMessage,
}: EmailSlideProps) => {
  return (
    <div className="step">
      <div className={styles.modelContentContainer}>
        <p className={styles.title}>Login</p>
        <ChatInput
          onSubmit={onSubmitEmail}
          onChange={onChangeEmail}
          value={email}
          disabled={false}
          buttonDisabled={submitEmailDisabled}
          errorMessage={emailErrorMessage}
          placeholder="Enter your e-mail adress"
          label="E-mail"
        />
      </div>
    </div>
  );
};

const OtpSlide = ({
  otp,
  onChangeOtp,
  onSubmitOtp,
  onClickResendOtp,
  onPressBack,
  submitOtpDisabled,
  otpErrorMessage,
}: OtpSlideProps) => {
  return (
    <div className="step">
      <div className={styles.modelContentContainer}>
        <span
          role="button"
          className={styles.modelHeaderContainer}
          onClick={onPressBack}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            color="var(--icon-color)"
            fixedWidth
            className={styles.icon}
          />
          <p className={styles.headerTitle}>Back</p>
        </span>
        <p className={styles.title}>Verification code</p>
        <ChatInput
          onSubmit={onSubmitOtp}
          onChange={onChangeOtp}
          value={otp}
          disabled={false}
          buttonDisabled={submitOtpDisabled}
          errorMessage={otpErrorMessage}
          placeholder="xxxxxx"
          label="Enter your OTP code"
          maxLength={6}
        />
        <p className={styles.footerTitle}>
          You did not receive the code?{" "}
          <span
            role="button"
            onClick={onClickResendOtp}
            className={styles.resendButton}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export { AuthModal };
