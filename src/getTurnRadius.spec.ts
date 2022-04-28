import { getTurnRadius } from "./index";

describe("getTurnRadius", () => {
    test("works for beechcraft bonanza", () => {
        expect(getTurnRadius(160, 30)).toBeCloseTo(0.645);
    });

    test("works for airliners", () => {
        expect(getTurnRadius(450, 30)).toBeCloseTo(5.14);
    });
});
