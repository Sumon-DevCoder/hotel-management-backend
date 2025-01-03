import { z } from "zod";
import { ReviewStatus } from "./review.interface";

// Create Review Schema (Validation)
const CreateReviewValidationSchema = z.object({
  roomId: z.string().uuid("Invalid Room ID"), // Ensure roomId is a valid UUID (or use ObjectId for MongoDB)
  userId: z.string().uuid("Invalid User ID"), // Ensure userId is a valid UUID (or use ObjectId for MongoDB)
  rating: z
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .min(1, "Comment is required")
    .max(1000, "Comment must not exceed 1000 characters"),
  status: z
    .enum([ReviewStatus.Approved, ReviewStatus.Pending, ReviewStatus.Rejected])
    .optional(),
});

// Update Review Schema (Validation)
const UpdateReviewValidationSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5")
    .optional(),
  comment: z
    .string()
    .min(1, "Comment is required")
    .max(1000, "Comment must not exceed 1000 characters")
    .optional(),
  status: z
    .enum([ReviewStatus.Approved, ReviewStatus.Pending, ReviewStatus.Rejected])
    .optional(),
});

export const ReviewValidation = {
  CreateReviewValidationSchema,
  UpdateReviewValidationSchema,
};
