import { getVerticalFlightpathAngle } from ".";

describe("getTurnRadius", () => {
    test("works for a small single prop aircraft during a standard 3° approach", () => {
        expect(getVerticalFlightpathAngle(100, -530)).toBeCloseTo(-3);
    });

    test("works for an airliner during a steep 4° approach", () => {
        expect(getVerticalFlightpathAngle(150, -1062)).toBeCloseTo(-4);
    });

    test("works for positive angles", () => {
        expect(getVerticalFlightpathAngle(200, 3500)).toBeCloseTo(9.8);
    });
});

