import mongoose, { Schema, Document } from "mongoose";
import { ReviewStatus, TReview } from "./review.interface";

// Define Review Schema
const ReviewSchema = new Schema<TReview>(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: {
      type: String,
      required: true,
      maxlength: 1000, // Maximum length of comment (e.g., 1000 characters)
    },
    status: {
      type: String,
      enum: Object.values(ReviewStatus), // Ensures only enum values are allowed
      default: ReviewStatus.Pending, // Default status is 'pending'
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create a Mongoose model based on the schema
const Review = mongoose.model<TReview>("Review", ReviewSchema);
export default Review;
