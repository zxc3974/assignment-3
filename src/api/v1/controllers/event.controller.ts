import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus.js";
import type { CreateEventInput, UpdateEventInput } from "../models/event.model.js";
import * as eventService from "../services/event.service.js";

export async function createEvent(req: Request, res: Response): Promise<void> {
  try {
    const event = await eventService.createEvent(req.body as CreateEventInput);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Event created",
      data: event,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to create event",
    });
  }
}

export async function getAllEvents(_req: Request, res: Response): Promise<void> {
  try {
    const events = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved",
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "Failed to retrieve events",
    });
  }
}

function getParamId(req: Request): string {
  const id = req.params.id;
  return Array.isArray(id) ? id[0]! : id!;
}

export async function getEventById(req: Request, res: Response): Promise<void> {
  try {
    const event = await eventService.getEventById(getParamId(req));

    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event retrieved",
      data: event,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "Failed to retrieve event",
    });
  }
}

export async function updateEvent(req: Request, res: Response): Promise<void> {
  try {
    const event = await eventService.updateEvent(
      getParamId(req),
      req.body as UpdateEventInput,
    );

    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event updated",
      data: event,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to update event",
    });
  }
}

export async function deleteEvent(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await eventService.deleteEvent(getParamId(req));

    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Event deleted",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Failed to delete event",
    });
  }
}
