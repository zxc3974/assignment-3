import type {
  CreateEventInput,
  Event,
  UpdateEventInput,
} from "../models/event.model.js";
import * as eventRepository from "../repositories/event.repository.js";

export async function createEvent(input: CreateEventInput): Promise<Event> {
  try {
    return await eventRepository.createEvent({
      name: input.name,
      date: input.date,
      capacity: input.capacity,
      registrationCount: input.registrationCount ?? 0,
      status: input.status ?? "active",
      category: input.category ?? "general",
    });
  } catch (error) {
    throw new Error(
      `Failed to create event: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getAllEvents(): Promise<Event[]> {
  try {
    return await eventRepository.getAllEvents();
  } catch (error) {
    throw new Error(
      `Failed to retrieve events: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    return await eventRepository.getEventById(id);
  } catch (error) {
    throw new Error(
      `Failed to retrieve event: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
): Promise<Event | null> {
  try {
    return await eventRepository.updateEvent(id, input);
  } catch (error) {
    throw new Error(
      `Failed to update event: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function deleteEvent(id: string): Promise<boolean> {
  try {
    return await eventRepository.deleteEvent(id);
  } catch (error) {
    throw new Error(
      `Failed to delete event: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
