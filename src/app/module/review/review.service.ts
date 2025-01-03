import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import Review from "./review.model";
import { TReview } from "./review.interface";
import { reviewSearchableFields } from "./review.constant";

// create
const createReviewIntoDB = async (payload: TReview) => {
  // Review checking
  const isReviewExists = await Review.findOne({
    name: payload.roomId,
    ReviewNumber: payload.userId,
  });

  if (isReviewExists) {
    throw new AppError(StatusCodes.CONFLICT, "Review already exists!");
  }

  const result = await Review.create(payload);
  return result;
};

// get all
const getAllReviewFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const ReviewQuery = new QueryBuilder(Review.find(), query)
    .search(reviewSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ReviewQuery.countTotal();
  const result = await ReviewQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Reviews not available!");
  }

  return {
    meta,
    result,
  };
};

// getReviewBy Room specific
const getReviewByRoom = async (roomId: string) => {
  const result = await Review.find({ roomId });

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Reviews not available!");
  }

  return result;
};

// get single
const getSingleReviewFromDB = async (_id: string) => {
  const result = await Review.findById({ _id });

  // checking data
  if (result === null) {
    throw new AppError(StatusCodes.NOT_FOUND, "Reviews not available!");
  }

  return result;
};

// update
const updateReviewIntoDB = async (_id: string, payload: Partial<TReview>) => {
  // Review checking
  const isReviewExists = await Review.findById(_id);
  if (!isReviewExists) {
    throw new AppError(StatusCodes.CONFLICT, "Review not exists!");
  }

  const result = await Review.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

// update
const deleteReviewIntoDB = async (_id: string) => {
  // Review checking
  const ReviewData = await Review.findById(_id);
  if (!ReviewData) {
    throw new AppError(StatusCodes.CONFLICT, "Review not exists!");
  }

  const result = await Review.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getSingleReviewFromDB,
  getReviewByRoom,
  getAllReviewFromDB,
  updateReviewIntoDB,
  deleteReviewIntoDB,
};
