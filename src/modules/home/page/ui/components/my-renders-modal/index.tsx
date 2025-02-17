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
import { Render } from "../../../hooks/use-home";
import { VITE_IMAGE_BASE_URL } from "../../../../../../constants/api";

Modal.setAppElement("#root");

interface MyRendersProps {
  isOpen: boolean;
  onClickBackMyRenders: VoidFunction;
  isGetMyRendersPending: boolean;
  myRenders: Render[];
  onClickRender: VoidFunction;
  myRendersSwiperRef: RefObject<SwiperClass>;
}

interface MyRendersSlideProps {
  renders: Render[];
  onClickBackMyRenders: VoidFunction;
  isLoading: boolean;
  onClickRender: (render: Render) => void;
}

// Splits
const chunkRenersArray = (array: Render[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array?.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

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
      shouldCloseOnEsc
      onRequestClose={onClickBackMyRenders}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, enabled: true }}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        className={styles.myRendersSwiper}
        allowTouchMove
        onSwiper={(swiper) => (myRendersSwiperRef.current = swiper)}
      >
        {chunkRenersArray(myRenders, 6).map((chunk, index) => (
          <SwiperSlide key={index}>
            <MyRendersSlide
              renders={chunk} // Aquí se pasan los 6 (o menos en el último chunk) elementos
              onClickBackMyRenders={onClickBackMyRenders}
              isLoading={isGetMyRendersPending}
              onClickRender={onClickRender}
            />
          </SwiperSlide>
        ))}
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
        {renders?.map((render) => (
          <button
            key={render?._id}
            className={styles.renderButton}
            onClick={() => onClickRender(render)}
          >
            <span className={styles.renderContainer}>
              <img
                src={`${VITE_IMAGE_BASE_URL}${render?.image_path}`}
                alt="My render"
                className={styles.renderImage}
              />
            </span>
          </button>
        ))}
      </span>
    </div>
  );
};

export { MyRendersModal };
