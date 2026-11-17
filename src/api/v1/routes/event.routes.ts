import { Router } from "express";
import * as eventController from "../controllers/event.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createEventSchema,
  eventIdSchema,
  updateEventSchema,
} from "../validation/event.validation.js";

const router = Router();

router.post("/", validate(createEventSchema), eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get(
  "/:id",
  validate(eventIdSchema, "params"),
  eventController.getEventById,
);
router.put(
  "/:id",
  validate(eventIdSchema, "params"),
  validate(updateEventSchema),
  eventController.updateEvent,
);
router.delete(
  "/:id",
  validate(eventIdSchema, "params"),
  eventController.deleteEvent,
);

export default router;
