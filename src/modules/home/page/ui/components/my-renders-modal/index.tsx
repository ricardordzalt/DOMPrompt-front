import Modal from "react-modal";
import styles from "./index.module.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { RefObject } from "react";
import Loader from "../../../../../../common/components/loader";

Modal.setAppElement("#root");

interface MyRendersProps {
  isOpen: boolean;
  onClickBackMyRenders: VoidFunction;
  isGetMyRendersPending: boolean;
  myRenders: object[];
  onClickRender: VoidFunction;
  myRendersSwiperRef: RefObject<SwiperClass>;
}

interface MyRendersSlideProps {
  renders: object[];
  onClickBackMyRenders: VoidFunction;
  isLoading: boolean;
  onClickRender: (render: object) => void;
}

const MyRendersModal = ({
  isOpen,
  onClickBackMyRenders,
  isGetMyRendersPending,
  myRenders,
  onClickRender,
  myRendersSwiperRef,
}: MyRendersProps) => {
  return (
    <Modal
      contentLabel="My Renders Modal"
      className={styles.myRendersModal}
      overlayClassName={styles.myRendersModalOverlay}
      isOpen={isOpen}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, enabled: true }}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        className={styles.myRendersSwiper}
        allowTouchMove={false}
        onSwiper={(swiper) => (myRendersSwiperRef.current = swiper)}
      >
        <SwiperSlide>
          <MyRendersSlide
            renders={myRenders}
            onClickBackMyRenders={onClickBackMyRenders}
            isLoading={isGetMyRendersPending}
            onClickRender={onClickRender}
          />
        </SwiperSlide>
      </Swiper>
    </Modal>
  );
};

const MyRendersSlide = ({
  renders,
  onClickBackMyRenders,
  isLoading,
  onClickRender,
}: MyRendersSlideProps) => {
  if (isLoading) {
    return (
      <span className={styles.loaderContainer}>
        <Loader />
      </span>
    );
  }

  return (
    <div className={styles.modelContentContainer}>
      <span
        role="button"
        className={styles.modelHeaderContainer}
        onClick={onClickBackMyRenders}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          color="var(--icon-color)"
          fixedWidth
          className={styles.icon}
        />
        <p className={styles.headerTitle}>Back</p>
      </span>
      <span className={styles.myRendersContainer}>
        {renders?.map((render, index) => (
          <button className={styles.renderButton} onClick={() => onClickRender(render)}>
            <span className={styles.renderContainer}>
              <p className={styles.renderTitle}>{index + 1}</p>
            </span>
          </button>
        ))}
      </span>
    </div>
  );
};

export { MyRendersModal };
