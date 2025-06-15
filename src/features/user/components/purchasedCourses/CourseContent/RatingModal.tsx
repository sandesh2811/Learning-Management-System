// Refactor
import { RatingModalVariant } from "@/features/user/animation/variants";

import { useDisableScroll } from "@/hooks/useDisableScroll";

import { removeAriaHidden, setAriaHidden } from "@/utils/ariaHidden";

import Button from "@/components/ui/Button";
import { Span } from "@/components/ui/Span";

import { createPortal } from "react-dom";
import { motion as m } from "motion/react";
import { GoStar, GoStarFill, GoX } from "react-icons/go";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface RatingModalProps {
    isModalActive: boolean;
    setActiveStateFalse: () => void;
}

const RatingModal = ({
    isModalActive,
    setActiveStateFalse,
}: RatingModalProps) => {
    /* Add aria hidden and scroll to top when modal is active */
    useEffect(() => {
        if (isModalActive) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });

            setAriaHidden({ id: "rating-modal-container" });
        }
    }, [isModalActive]);

    /* Disable the scroll when modal is active */
    useDisableScroll(isModalActive);

    return createPortal(
        <div
            id="rating-modal-container"
            className="bg-primary-text/50 absolute top-0 left-0 z-30 flex h-full w-full items-center justify-center backdrop-blur-sm"
        >
            <m.div
                role="modal"
                aria-label="Course rating modal"
                aria-modal="true"
                variants={RatingModalVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-background flex min-h-[35vh] w-[500px] flex-col justify-between gap-6 rounded-sm p-6"
            >
                {/* MODAL CLOSE BUTTON */}
                <CloseRatingModalButton
                    setActiveStateFalse={setActiveStateFalse}
                />

                {/* MODAL HEADING */}
                <h3 className="text-center text-2xl font-semibold">
                    What do you think about this course?
                </h3>

                {/* MODAL ELEMENTS */}
                <RatingElements />

                {/* MODAL FOOTER */}
                <span className="text-primary-text/80 text-center text-sm">
                    Please note that the submitted rating and comment will show
                    your fullname and profile picture in the course rating!
                </span>
            </m.div>
        </div>,
        document.body
    );
};

export default RatingModal;

/* CLOSE MODAL BUTTON COMPONENT */

interface CloseRatingModalProps {
    setActiveStateFalse: () => void;
}

const CloseRatingModalButton = ({
    setActiveStateFalse,
}: CloseRatingModalProps) => {
    const handleModalClose = () => {
        setActiveStateFalse();
        removeAriaHidden({ id: "rating-modal-container" });
    };

    return (
        <div className="flex justify-end">
            <Span onClick={handleModalClose}>
                <GoX size={22} />
            </Span>
        </div>
    );
};

/* RATING STARS, COMMENT TEXTAREA AND SUBMIT FEEDBACK BUTTON COMPONENT */

const RatingElements = () => {
    const [selectedStars, setSelectedStars] = useState<number>(0);

    return (
        <div className="flex flex-col gap-4">
            <StarRating
                selectedStars={selectedStars}
                setSelectedStars={setSelectedStars}
            />

            <textarea
                rows={3}
                cols={3}
                id="comment"
                name="name"
                placeholder="Comment (optional)"
                autoComplete="off"
                className="border-primary-text/20 rounded-xs border-[1.2px] p-2"
            />

            <Button className="w-full rounded-xs">Submit your feedback</Button>
        </div>
    );
};

/* STAR RATING COMPONENT */

interface StarRatingProps {
    selectedStars: number;
    setSelectedStars: Dispatch<SetStateAction<number>>;
}

const StarRating = ({ selectedStars, setSelectedStars }: StarRatingProps) => {
    const stars = Array.from({ length: 5 });

    return (
        <div className="flex justify-center gap-2">
            {selectedStars === 0
                ? stars.map((_, idx) => (
                      <Span key={idx} onClick={() => setSelectedStars(idx + 1)}>
                          <GoStar size={30} />
                      </Span>
                  ))
                : selectedStars > 0 &&
                  stars.map((_, idx) => {
                      if (idx + 1 <= selectedStars) {
                          return (
                              <Span
                                  key={idx}
                                  onClick={() => setSelectedStars(idx + 1)}
                              >
                                  <GoStarFill size={30} color="yellow" />
                              </Span>
                          );
                      } else {
                          return (
                              <Span
                                  key={idx}
                                  onClick={() => setSelectedStars(idx + 1)}
                              >
                                  <GoStar size={30} />
                              </Span>
                          );
                      }
                  })}
        </div>
    );
};
