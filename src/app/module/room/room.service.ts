import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import Room from "./room.model";
import { TRoom } from "./room.interface";
import { roomSearchableFields } from "./room.constant";

// create
const createRoomIntoDB = async (payload: TRoom) => {
  // Room checking
  const isRoomExists = await Room.findOne({
    name: payload.roomName,
    roomNumber: payload.roomNumber,
  });

  if (isRoomExists) {
    throw new AppError(StatusCodes.CONFLICT, "Room already exists!");
  }

  const result = await Room.create(payload);
  return result;
};

// get all
const getAllRoomFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const RoomQuery = new QueryBuilder(Room.find(), query)
    .search(roomSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await RoomQuery.countTotal();
  const result = await RoomQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rooms not available!");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleRoomFromDB = async (_id: string) => {
  const result = await Room.findById({ _id });

  // checking data
  if (result === null) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rooms not available!");
  }

  return result;
};

// update
const updateRoomIntoDB = async (_id: string, payload: Partial<TRoom>) => {
  // Room checking
  const isRoomExists = await Room.findById(_id);
  if (!isRoomExists) {
    throw new AppError(StatusCodes.CONFLICT, "Room not exists!");
  }

  const result = await Room.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

// update
const deleteRoomIntoDB = async (_id: string) => {
  // Room checking
  const RoomData = await Room.findById(_id);
  if (!RoomData) {
    throw new AppError(StatusCodes.CONFLICT, "Room not exists!");
  }

  const result = await Room.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomFromDB,
  updateRoomIntoDB,
  deleteRoomIntoDB,
};
