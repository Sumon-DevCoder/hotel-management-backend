import { z } from "zod";
import { TAmenity, TRoomType } from "./room.interface"; // Assuming these are defined elsewhere
import { updateUserValidationSchema } from "../user/user.validation";

// Define DateRange schema for validation
const DateRangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});

// Define validation schema for creating a room
const CreateRoomValidationSchema = z.object({
  roomName: z.string().min(1, "Room name is required"),
  roomNumber: z.number().int().min(1, "Room number must be a positive integer"),
  type: z.enum(Object.values(TRoomType) as [string, ...string[]]), // Use Object.values to get the values of the enum
  description: z.string().min(1, "Description is required"),
  pricePerNight: z
    .number()
    .positive("Price per night must be a positive number"),
  amenities: z
    .array(z.enum(Object.values(TAmenity) as [string, ...string[]])) // Use Object.values to get the values of the enum
    .nonempty("At least one amenity is required"),
  capacity: z.number().int().min(1, "Capacity must be a positive integer"),
  isAvailable: z.boolean().optional().default(true),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
  isDeleted: z.boolean().optional().default(false),
  bookedDates: z
    .array(DateRangeSchema)
    .min(1, "At least one booked date range is required"),
  floorNumber: z.number().int().nullable().optional(),
});

// Define validation schema for updating a room
const UpdateRoomSchema = z.object({
  roomName: z.string().min(1, "Room name is required").optional(),
  roomNumber: z
    .number()
    .int()
    .min(1, "Room number must be a positive integer")
    .optional(),
  type: z.enum(Object.values(TRoomType) as [string, ...string[]]).optional(), // Use Object.values to get the values of the enum
  description: z.string().min(1, "Description is required").optional(),
  pricePerNight: z
    .number()
    .positive("Price per night must be a positive number")
    .optional(),
  amenities: z
    .array(z.enum(Object.values(TAmenity) as [string, ...string[]])) // Use Object.values to get the values of the enum
    .nonempty("At least one amenity is required")
    .optional(),
  capacity: z
    .number()
    .int()
    .min(1, "Capacity must be a positive integer")
    .optional(),
  isAvailable: z.boolean().optional(),
  images: z.array(z.string().url("Invalid image URL")).optional(),
  isDeleted: z.boolean().optional(),
  bookedDates: z.array(DateRangeSchema).optional(),
  floorNumber: z.number().int().nullable().optional(),
});

export const RoomValidationSchema = {
  CreateRoomValidationSchema,
  updateUserValidationSchema,
};
