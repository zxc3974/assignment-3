import Joi from "joi";

const STATUS_VALUES = ["active", "cancelled", "completed"] as const;
const CATEGORY_VALUES = [
  "conference",
  "workshop",
  "meetup",
  "seminar",
  "general",
] as const;

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).required(),
  date: Joi.date().iso().greater("now").required(),
  capacity: Joi.number().integer().min(5).required(),
  registrationCount: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("capacity"))
    .default(0),
  status: Joi.string()
    .valid(...STATUS_VALUES)
    .default("active"),
  category: Joi.string()
    .valid(...CATEGORY_VALUES)
    .default("general"),
});

export const updateEventSchema = Joi.object({
  name: Joi.string().min(3),
  date: Joi.date().iso().greater("now"),
  capacity: Joi.number().integer().min(5),
  registrationCount: Joi.when("capacity", {
    is: Joi.exist(),
    then: Joi.number().integer().min(0).max(Joi.ref("capacity")),
    otherwise: Joi.number().integer().min(0),
  }),
  status: Joi.string().valid(...STATUS_VALUES),
  category: Joi.string().valid(...CATEGORY_VALUES),
}).min(1);

export const eventIdSchema = Joi.object({
  id: Joi.string().trim().min(1).required(),
});
