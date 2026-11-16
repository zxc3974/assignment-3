import type { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpStatus.js";

type RequestTarget = "body" | "params" | "query";

export const validate =
  (schema: ObjectSchema, target: RequestTarget = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: `Validation error: ${error.details[0].message}`,
      });
      return;
    }

    // Normalize Joi Date objects back to ISO strings for API/Firestore
    if (value && typeof value === "object" && value.date instanceof Date) {
      value.date = value.date.toISOString();
    }

    req[target] = value;
    next();
  };
