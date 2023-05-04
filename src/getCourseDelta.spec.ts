import { getCourseDelta, TurnDirection } from ".";

/* eslint-disable max-lines-per-function */
describe("common features", () => {
    test("getCourseDelta without turn direction", () => {
        expect(getCourseDelta(0, 90)).toBe(90);
        expect(getCourseDelta(90, 180)).toBe(90);
        expect(getCourseDelta(180, 270)).toBe(90);
        expect(getCourseDelta(270, 0)).toBe(90);

        expect(getCourseDelta(270, 80)).toBe(170);
        expect(getCourseDelta(90, 260)).toBe(170);

        expect(getCourseDelta(0, 270)).toBe(-90);
        expect(getCourseDelta(270, 180)).toBe(-90);
        expect(getCourseDelta(180, 90)).toBe(-90);
        expect(getCourseDelta(90, 0)).toBe(-90);

        expect(getCourseDelta(90, 280)).toBe(-170);
        expect(getCourseDelta(270, 100)).toBe(-170);

        expect(getCourseDelta(360, 720)).toBe(0);
        expect(getCourseDelta(720, 360)).toBe(0);
        expect(getCourseDelta(0, 360)).toBe(0);
        expect(getCourseDelta(360, 0)).toBe(0);
        expect(getCourseDelta(90, 90)).toBe(0);

        expect(() => {
            getCourseDelta(270, 90);
        }).toThrowError("Turn direction indistinct");

        expect(() => {
            getCourseDelta(90, 270);
        }).toThrowError("Turn direction indistinct");
    });

    test("getCourseDelta with turn direction", () => {
        expect(getCourseDelta(0, 90, TurnDirection.RIGHT)).toBe(90);
        expect(getCourseDelta(90, 180, TurnDirection.RIGHT)).toBe(90);
        expect(getCourseDelta(180, 270, TurnDirection.RIGHT)).toBe(90);
        expect(getCourseDelta(270, 0, TurnDirection.RIGHT)).toBe(90);

        expect(getCourseDelta(90, 270, TurnDirection.RIGHT)).toBe(180);
        expect(getCourseDelta(90, 0, TurnDirection.RIGHT)).toBe(270);
        expect(getCourseDelta(90, 89, TurnDirection.RIGHT)).toBe(359);

        expect(getCourseDelta(0, 270, TurnDirection.LEFT)).toBe(-90);
        expect(getCourseDelta(270, 180, TurnDirection.LEFT)).toBe(-90);
        expect(getCourseDelta(180, 90, TurnDirection.LEFT)).toBe(-90);
        expect(getCourseDelta(90, 0, TurnDirection.LEFT)).toBe(-90);

        expect(getCourseDelta(270, 90, TurnDirection.LEFT)).toBe(-180);
        expect(getCourseDelta(270, 0, TurnDirection.LEFT)).toBe(-270);
        expect(getCourseDelta(270, 271, TurnDirection.LEFT)).toBe(-359);
    });
});
