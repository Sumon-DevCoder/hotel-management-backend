import mongoose, { Schema } from "mongoose";
import { TRoomType, TRoom, TAmenity, TDateRange } from "./room.interface";

// Define DateRange Schema
const DateRangeSchema = new Schema<TDateRange>(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { _id: false } // Prevents adding an _id field to each date range
);

// Room Schema
const RoomSchema = new Schema<TRoom>(
  {
    roomName: { type: String, required: true },
    roomNumber: { type: Number, required: true, unique: true },
    type: { type: String, enum: Object.values(TRoomType), required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: {
      type: [String],
      enum: Object.values(TAmenity),
      required: true,
    },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    images: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
    bookedDates: { type: [DateRangeSchema], required: true },
    floorNumber: { type: Number, default: null },
  },
  { timestamps: true }
);

const Room = mongoose.model<TRoom>("Room", RoomSchema);
export default Room;
