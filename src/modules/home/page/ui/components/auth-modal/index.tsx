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
import Loader from "../../../../../../common/components/loader";

Modal.setAppElement("#root");

interface AuthModalProps {
  isOpen: boolean;
  onSubmitEmail: VoidFunction;
  onSubmitOtp: VoidFunction;
  onClickResendOtp: VoidFunction;
  onClickBackAuth: VoidFunction;
  email: string;
  onChangeEmail: VoidFunction;
  otp: string;
  onChangeOtp: VoidFunction;
  submitEmailDisabled: boolean;
  submitOtpDisabled: boolean;
  emailErrorMessage: string;
  otpErrorMessage: string;
  isRequestOtpPending: boolean;
  isVerifyOtpPending: boolean;
  showPolicyPrivacy: boolean;
  policyPrivacyChecked: boolean;
  onClickPrivacyPolicyCheckbox: VoidFunction;
  authSwiperRef: RefObject<SwiperClass>;
}

interface EmailSlideProps {
  email: string;
  onChangeEmail: VoidFunction;
  onSubmitEmail: VoidFunction;
  submitEmailDisabled: boolean;
  emailErrorMessage: string;
  isLoading: boolean;
}

interface OtpSlideProps {
  otp: string;
  onChangeOtp: VoidFunction;
  onSubmitOtp: VoidFunction;
  onClickResendOtp: VoidFunction;
  onClickBackAuth: VoidFunction;
  submitOtpDisabled: boolean;
  otpErrorMessage: string;
  isLoading: boolean;
  showPolicyPrivacy: boolean;
  policyPrivacyChecked: boolean;
  onClickPrivacyPolicyCheckbox: VoidFunction;
}

const AuthModal = ({
  isOpen,
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
  showPolicyPrivacy,
  policyPrivacyChecked,
  onClickPrivacyPolicyCheckbox,
  authSwiperRef,
}: AuthModalProps) => {
  return (
    <Modal
      contentLabel="Authentication modal"
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
        onSwiper={(swiper) => (authSwiperRef.current = swiper)}
      >
        <SwiperSlide>
          <EmailSlide
            email={email}
            onChangeEmail={onChangeEmail}
            onSubmitEmail={onSubmitEmail}
            submitEmailDisabled={submitEmailDisabled}
            emailErrorMessage={emailErrorMessage}
            isLoading={isRequestOtpPending}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OtpSlide
            otp={otp}
            onChangeOtp={onChangeOtp}
            onSubmitOtp={onSubmitOtp}
            onClickResendOtp={onClickResendOtp}
            onClickBackAuth={onClickBackAuth}
            submitOtpDisabled={submitOtpDisabled}
            otpErrorMessage={otpErrorMessage}
            isLoading={isVerifyOtpPending}
            showPolicyPrivacy={showPolicyPrivacy}
            policyPrivacyChecked={policyPrivacyChecked}
            onClickPrivacyPolicyCheckbox={onClickPrivacyPolicyCheckbox}
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
  isLoading,
}: EmailSlideProps) => {
  if (isLoading) {
    return (
      <span className={styles.loaderContainer}>
        <Loader />
      </span>
    );
  }

  return (
    <div className={styles.modalcontentContainer}>
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
  );
};

const OtpSlide = ({
  otp,
  onChangeOtp,
  onSubmitOtp,
  // onClickResendOtp,
  onClickBackAuth,
  submitOtpDisabled,
  otpErrorMessage,
  isLoading,
  showPolicyPrivacy,
  policyPrivacyChecked,
  onClickPrivacyPolicyCheckbox,
}: OtpSlideProps) => {
  if (isLoading) {
    return (
      <span className={styles.loaderContainer}>
        <Loader />
      </span>
    );
  }

  const policyPrivacy = (
    <span className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id="policy-privacy"
        name="policyPrivacy"
        value="newsletter"
        checked={policyPrivacyChecked}
        className={styles.checkbox}
        onClick={onClickPrivacyPolicyCheckbox}
      />
      <label htmlFor="policy-privacy" className={styles.checkboxLabel}>
        I have read and accept the{" "}
        <a
          href="/policy-privacy"
          target="_blank"
          className={styles.checkboxLink}
        >
          policy privacy
        </a>
      </label>
    </span>
  );

  return (
    <div className={styles.modalcontentContainer}>
      <span
        role="button"
        className={styles.modelHeaderContainer}
        onClick={onClickBackAuth}
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
        footer={showPolicyPrivacy ? policyPrivacy : null}
      />
      {/* <p className={styles.footerTitle}>
        You did not receive the code?{" "}
        <span
          role="button"
          onClick={onClickResendOtp}
          className={styles.resendButton}
        >
          Resend
        </span>
      </p> */}
    </div>
  );
};

export { AuthModal };
