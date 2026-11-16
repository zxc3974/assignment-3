import type { CreateEventInput, Event, UpdateEventInput } from "../models/event.model.js";
import {
  countDocuments,
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
} from "./firestore.repository.js";

const COLLECTION = "events";

function nextEventId(count: number): string {
  return `evt_${String(count + 1).padStart(6, "0")}`;
}

export async function createEvent(
  input: Required<
    Pick<CreateEventInput, "name" | "date" | "capacity" | "registrationCount" | "status" | "category">
  >,
): Promise<Event> {
  const now = new Date().toISOString();
  const count = await countDocuments(COLLECTION);
  const id = nextEventId(count);

  const payload = {
    name: input.name,
    date: input.date,
    capacity: input.capacity,
    registrationCount: input.registrationCount,
    status: input.status,
    category: input.category,
    createdAt: now,
    updatedAt: now,
  };

  return createDocument<Omit<Event, "id">>(COLLECTION, payload, id);
}

export async function getAllEvents(): Promise<Event[]> {
  return getAllDocuments<Omit<Event, "id">>(COLLECTION);
}

export async function getEventById(id: string): Promise<Event | null> {
  return getDocumentById<Omit<Event, "id">>(COLLECTION, id);
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
): Promise<Event | null> {
  return updateDocument<Omit<Event, "id">>(COLLECTION, id, {
    ...input,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteEvent(id: string): Promise<boolean> {
  return deleteDocument(COLLECTION, id);
}
