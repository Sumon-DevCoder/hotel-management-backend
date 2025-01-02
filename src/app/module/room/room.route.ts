import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { RoomValidationSchema } from "./room.validation";
import { RoomControllers } from "./room.controller";

const router = Router();

// create
router.post(
  "/",
  validateRequest(RoomValidationSchema.CreateRoomValidationSchema),
  auth(USER_ROLE.admin),
  RoomControllers.createRoom
);

// get all
router.get("/", RoomControllers.getAllRooms);

// get single
router.get("/:id", RoomControllers.getSingleRooms);

// update
router.put(
  "/:id",
  validateRequest(RoomValidationSchema.updateUserValidationSchema),
  auth(USER_ROLE.admin),
  RoomControllers.updateRoom
);

// delete
router.delete("/:id", auth(USER_ROLE.admin), RoomControllers.deleteRoom);

export const RoomRoutes = router;
