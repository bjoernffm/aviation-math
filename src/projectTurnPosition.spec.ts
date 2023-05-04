import { Position, projectTurnPosition, TurnDirection } from ".";

describe("placeBearingDistance", () => {
    test("should get the destination point to a given point, distance and bearing with a left turn", () => {
        const position = new Position(50.0379326, 8.5599631);
        const result = projectTurnPosition(position, 270, 90, 4, TurnDirection.LEFT);
        expect(result.lat).toBe(49.90483820750475);
        expect(result.lon).toBe(8.5599631);
    });

    test("should get the destination point to a given point, distance and bearing with a right turn", () => {
        const position = new Position(50.0379326, 8.5599631);
        const result = projectTurnPosition(position, 270, 90, 4, TurnDirection.RIGHT);
        expect(result.lat).toBe(50.171026992495264);
        expect(result.lon).toBe(8.5599631);
    });
});
