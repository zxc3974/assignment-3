import * as eventRepository from "../src/api/v1/repositories/event.repository.js";
import * as eventService from "../src/api/v1/services/event.service.js";
import type { Event } from "../src/api/v1/models/event.model.js";

jest.mock("../src/api/v1/repositories/event.repository.js");

const mockedRepository = eventRepository as jest.Mocked<typeof eventRepository>;

const sampleEvent: Event = {
  id: "evt_000001",
  name: "Tech Conference 2025",
  date: "2099-12-25T09:00:00.000Z",
  capacity: 200,
  registrationCount: 50,
  status: "active",
  category: "conference",
  createdAt: "2025-12-18T21:24:50.029Z",
  updatedAt: "2025-12-18T21:24:50.029Z",
};

describe("event.service", () => {
  it("should create an event through the repository", async () => {
    // Arrange
    mockedRepository.createEvent.mockResolvedValue(sampleEvent);
    const input = {
      name: sampleEvent.name,
      date: sampleEvent.date,
      capacity: sampleEvent.capacity,
      registrationCount: sampleEvent.registrationCount,
      status: sampleEvent.status,
      category: sampleEvent.category,
    };

    // Act
    const result = await eventService.createEvent(input);

    // Assert
    expect(mockedRepository.createEvent).toHaveBeenCalledWith(input);
    expect(result).toEqual(sampleEvent);
  });

  it("should get all events through the repository", async () => {
    // Arrange
    mockedRepository.getAllEvents.mockResolvedValue([sampleEvent]);

    // Act
    const result = await eventService.getAllEvents();

    // Assert
    expect(mockedRepository.getAllEvents).toHaveBeenCalledTimes(1);
    expect(result).toEqual([sampleEvent]);
  });

  it("should get an event by id through the repository", async () => {
    // Arrange
    mockedRepository.getEventById.mockResolvedValue(sampleEvent);

    // Act
    const result = await eventService.getEventById("evt_000001");

    // Assert
    expect(mockedRepository.getEventById).toHaveBeenCalledWith("evt_000001");
    expect(result).toEqual(sampleEvent);
  });

  it("should update an event through the repository", async () => {
    // Arrange
    const updated = { ...sampleEvent, name: "Updated Event" };
    mockedRepository.updateEvent.mockResolvedValue(updated);

    // Act
    const result = await eventService.updateEvent("evt_000001", {
      name: "Updated Event",
    });

    // Assert
    expect(mockedRepository.updateEvent).toHaveBeenCalledWith("evt_000001", {
      name: "Updated Event",
    });
    expect(result).toEqual(updated);
  });

  it("should delete an event through the repository", async () => {
    // Arrange
    mockedRepository.deleteEvent.mockResolvedValue(true);

    // Act
    const result = await eventService.deleteEvent("evt_000001");

    // Assert
    expect(mockedRepository.deleteEvent).toHaveBeenCalledWith("evt_000001");
    expect(result).toBe(true);
  });
});
