import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ReviewValidation } from "./review.validation";
import { ReviewControllers } from "./review.controller";

const router = Router();

// create
router.post(
  "/",
  validateRequest(ReviewValidation.CreateReviewValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user),
  ReviewControllers.createReview
);

// get all
router.get("/", ReviewControllers.getAllReviews);

// get single
router.get("/:id", ReviewControllers.getSingleReviews);

// get reivew by room
router.get("/:roomId", ReviewControllers.getReviewByRoom);

// update
router.put(
  "/:id",
  validateRequest(ReviewValidation.UpdateReviewValidationSchema),
  auth(USER_ROLE.admin),
  ReviewControllers.updateReview
);

// delete
router.delete("/:id", auth(USER_ROLE.admin), ReviewControllers.deleteReview);

export const ReviewRoutes = router;
