import { robustAcos, clampAngle } from "./common";

describe("common features", () => {
    test("robustAcos", () => {
        expect(robustAcos(0)).toBe(0);

        expect(robustAcos(0.5)).toBe(0.5);
        expect(robustAcos(1)).toBe(1);
        expect(robustAcos(1.5)).toBe(1);

        expect(robustAcos(-0.5)).toBe(-0.5);
        expect(robustAcos(-1)).toBe(-1);
        expect(robustAcos(-1.5)).toBe(-1);
    });

    test("clampAngle", () => {
        expect(clampAngle(480)).toBe(120);
    });
});
