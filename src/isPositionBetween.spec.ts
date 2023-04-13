import { Position } from "./index";
import { isPositionBetween } from "./isPositionBetween";

/* eslint-disable max-lines-per-function */
describe("isPositionBetween", () => {
    test("south prior north east to south west", () => {
        const pos1 = new Position("494707N0072853E");
        const pos2 = new Position("493816N0071556E");
        const positionToCheck = new Position("494843N0073819E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeFalsy();
    });

    test("north prior north east to south west", () => {
        const pos1 = new Position("494707N0072853E");
        const pos2 = new Position("493816N0071556E");
        const positionToCheck = new Position("495151N0073116E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeFalsy();
    });

    test("south between north east to south west", () => {
        const pos1 = new Position("494707N0072853E");
        const pos2 = new Position("493816N0071556E");
        const positionToCheck = new Position("494040N0072659E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeTruthy();
    });

    test("north between north east to south west", () => {
        const pos1 = new Position("494707N0072853E");
        const pos2 = new Position("493816N0071556E");
        const positionToCheck = new Position("494534N0071807E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeTruthy();
    });

    test("south between south west to north east", () => {
        const pos1 = new Position("493816N0071556E");
        const pos2 = new Position("495158N0072402E");
        const positionToCheck = new Position("494501N0072700E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeTruthy();
    });

    test("north between south west to north east", () => {
        const pos1 = new Position("493816N0071556E");
        const pos2 = new Position("494707N0072853E");
        const positionToCheck = new Position("494534N0071807E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeTruthy();
    });

    test("south after north east to south west", () => {
        const pos1 = new Position("494707N0072853E");
        const pos2 = new Position("493816N0071556E");
        const positionToCheck = new Position("493350N0071547E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeFalsy();
    });

    test("north after north east to south west", () => {
        const pos1 = new Position("494707N0072853E");
        const pos2 = new Position("493816N0071556E");
        const positionToCheck = new Position("493842N0070804E");
        const result = isPositionBetween(pos1, pos2, positionToCheck);
        expect(result).toBeFalsy();
    });
});
