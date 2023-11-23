import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import {
  ConfirmModal,
  Container,
  CustomBtnLink,
  EditRatingModal,
  NotFoundText,
  RatingStar,
} from "../cmps";
import { useAuth, useNotification } from "../hooks";
import {
  delete_review,
  get_review_by_movie,
  update_review,
} from "../api/review";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);

  const { movieId } = useParams();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;

  const { updateNotification } = useNotification();
  const get_reviews = async () => {
    const { movie, error } = await get_review_by_movie(movieId);
    if (error) return updateNotification("error", error);

    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };
  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);
    const matched = reviews.find((e) => e.owner.id === profileId);
    if (!matched)
      return updateNotification("error", "You don't have any review!");

    setProfileOwnersReview(matched);
  };

  const handleDeleteConfirm = async () => {
    setBusy(true)
    const { error, message } = await delete_review(profileOwnersReview.id);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnersReview.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnersReview(null);
    hideConfirmModal();
  };

  const handleOnEditClick = () => {
    const { id, content, rating } = profileOwnersReview;
    setSelectedReview({
      id,
      content,
      rating,
    });
    displayEditModal()
      };
    const handleOnReviewUpdate=(review)=>{
      const updateReview={
        ...profileOwnersReview,
        rating:review.rating,
        content:review.content
      }
      setProfileOwnersReview({...updateReview})
      const newReviews=reviews.map(r=>{
        if(r.id===updateReview.id) return updateReview;
        return r
      })
      setReviews([...newReviews])
    }

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const displayEditModal = () => setShowEditModal(true);
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };


  useEffect(() => {
    if (movieId) get_reviews();
  }, [movieId]);
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 py-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for:
            </span>{" "}
            {movieTitle}
          </h1>
          {profileId ? (
            <CustomBtnLink
              label={profileOwnersReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnersReview}
            />
          ) : null}
        </div>
        <NotFoundText text="No Reviews!" visible={!reviews.length} />
        {profileOwnersReview ? (
          <div>
            <ReviewCard review={profileOwnersReview} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button onClick={displayConfirmModal} type="button">
                <BsTrash />
              </button>
              <button onClick={handleOnEditClick} type="button">
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        )}
      </Container>
      <ConfirmModal
        busy={busy}
        title="Are you sure?"
        subtitle="This action will remove this review permanently."
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
      />
      <EditRatingModal
        initialState={selectedReview}
        visible={showEditModal}
        onClose={hideEditModal}
        onSuccess={handleOnReviewUpdate}
      />
    </div>
  );
};

export default MovieReviews;

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const { owner, content, rating } = review;

  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
        {getNameInitial(owner.name)}
      </div>
      <div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {owner.name}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  );
};
