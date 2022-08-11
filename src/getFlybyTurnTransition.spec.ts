import { Position, getFlybyTurnDetails, getBearing } from "./index";

describe("getFlybyTurnDetails", () => {
    test("works for north-eastern part", () => {
        const result = getFlybyTurnDetails(new Position(50, 9), 360, 270, 5);
        console.error(result)
    });
});
