import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import catchAsync from "../../utiils/catchAsync";
import sendResponse from "../../utiils/sendResponse";
import { ReviewServices } from "./review.service";

// create
const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});

// get all
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getAllReviewFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});

// get review by room
const getReviewByRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getReviewByRoom(req.params.roomId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});

// get single
const getSingleReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getSingleReviewFromDB(
    req.params.ReviewId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});

// update
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.updateReviewIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

// delete
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.deleteReviewIntoDB(req.params.ReviewId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

export const ReviewControllers = {
  deleteReview,
  updateReview,
  getReviewByRoom,
  createReview,
  getAllReviews,
  getSingleReviews,
};
