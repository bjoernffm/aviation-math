import { Path } from "..";
import { TurnDirection } from "../common";
import { Position } from "../position";
import { TurnTransition } from "./TurnTransition";

class TestTurnTransition extends TurnTransition {
    public generatePath(): Path {
        throw new Error("not implemented due to testing");
    }
}

/* eslint-disable max-lines-per-function */
describe("TurnTransition", () => {
    test("should set all members correctly on instantiating", () => {
        const turnTransition = new TestTurnTransition({
            inboundCourse: 180,
            outboundCourse: 90,
            startPosition: new Position(50, 9),
            endPosition: new Position(51, 10),
            turnRadius: 10,
            turnDirection: TurnDirection.LEFT
        });

        expect(turnTransition.inboundCourse).toBe(180);
        expect(turnTransition.outboundCourse).toBe(90);
        expect(turnTransition.startPosition.lat).toBe(50);
        expect(turnTransition.startPosition.lon).toBe(9);
        expect(turnTransition.endPosition.lat).toBe(51);
        expect(turnTransition.endPosition.lon).toBe(10);
        expect(turnTransition.turnRadius).toBe(10);
        expect(turnTransition.turnDirection).toBe(TurnDirection.LEFT);
        expect(turnTransition.courseDelta).toBe(-90);
    });

    test("should throw an error when using toPath() method", () => {
        const turnTransition = new TestTurnTransition({
            inboundCourse: 180,
            outboundCourse: 90,
            startPosition: new Position(50, 9),
            endPosition: new Position(51, 10),
            turnRadius: 10,
            turnDirection: TurnDirection.RIGHT
        });

        expect(turnTransition.toPath().length).toBe(0);
    });
});
