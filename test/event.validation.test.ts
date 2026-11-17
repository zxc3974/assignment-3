import { createEventSchema } from "../src/api/v1/validation/event.validation.js";

const futureDate = "2099-12-25T09:00:00.000Z";

describe("createEventSchema", () => {
  it("should require name", () => {
    // Arrange
    const payload = {
      date: futureDate,
      capacity: 200,
    };

    // Act
    const { error } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeDefined();
    expect(error!.details[0].message).toBe('"name" is required');
  });

  it("should reject name shorter than 3 characters", () => {
    // Arrange
    const payload = {
      name: "AB",
      date: futureDate,
      capacity: 100,
    };

    // Act
    const { error } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeDefined();
    expect(error!.details[0].message).toBe(
      '"name" length must be at least 3 characters long',
    );
  });

  it("should reject capacity below 5 and non-integers", () => {
    // Arrange
    const tooSmall = {
      name: "Small Event",
      date: futureDate,
      capacity: 4,
    };
    const notInteger = {
      name: "Test Event",
      date: futureDate,
      capacity: 50.5,
    };

    // Act
    const smallResult = createEventSchema.validate(tooSmall);
    const integerResult = createEventSchema.validate(notInteger);

    // Assert
    expect(smallResult.error!.details[0].message).toBe(
      '"capacity" must be greater than or equal to 5',
    );
    expect(integerResult.error!.details[0].message).toBe(
      '"capacity" must be an integer',
    );
  });

  it("should reject registrationCount greater than capacity", () => {
    // Arrange
    const payload = {
      name: "Overbooked Event",
      date: futureDate,
      capacity: 100,
      registrationCount: 150,
    };

    // Act
    const { error } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeDefined();
    expect(error!.details[0].message).toBe(
      '"registrationCount" must be less than or equal to ref:capacity',
    );
  });

  it("should apply defaults and accept a valid payload", () => {
    // Arrange
    const payload = {
      name: "ABC",
      date: futureDate,
      capacity: 100,
    };

    // Act
    const { error, value } = createEventSchema.validate(payload);

    // Assert
    expect(error).toBeUndefined();
    expect(value.registrationCount).toBe(0);
    expect(value.status).toBe("active");
    expect(value.category).toBe("general");
  });
});
