import { Position } from "../position";
import { FlybyTurnTransition } from "../";
import { pathToHash } from "../TestHelpers";

/* eslint-disable max-lines-per-function */
describe("FlybyTurnTransition", () => {
    test("left turn transition less than 180°", () => {
        const turnTransition = new FlybyTurnTransition({
            flybyWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 269,
            outboundCourse: 192,
            turnRadius: 5
        });

        expect(turnTransition.startPosition.toDMSCode()).toBe(turnTransition.toPath().getFirst().toDMSCode());
        expect(turnTransition.endPosition.toDMSCode()).toBe(turnTransition.toPath().getLast().toDMSCode());

        expect(turnTransition.toPath().length).toBe(77);
        expect(pathToHash(turnTransition.toPath())).toBe("ed56324adc12a552237c4d75c35d38635cb76aa5");
    });

    test("right turn transition less than 180°", () => {
        const turnTransition = new FlybyTurnTransition({
            flybyWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 333,
            outboundCourse: 60,
            turnRadius: 2
        });

        expect(turnTransition.startPosition.toDMSCode()).toBe(turnTransition.toPath().getFirst().toDMSCode());
        expect(turnTransition.endPosition.toDMSCode()).toBe(turnTransition.toPath().getLast().toDMSCode());

        expect(turnTransition.toPath().length).toBe(87);
        expect(pathToHash(turnTransition.toPath())).toBe("707143abb217b60778e5beadab4c76721c98bf48");
    });

    test("shallow turn", () => {
        const turnTransition = new FlybyTurnTransition({
            flybyWaypoint: new Position(-22.943800, -43.717201),
            inboundCourse: 270,
            outboundCourse: 300,
            turnRadius: 4
        });

        expect(turnTransition.toPath().length).toBe(30);
        expect(pathToHash(turnTransition.toPath())).toBe("415de77e12ad42b6f033eeb19cdad40043bf16af");
    });

    test("tight turn", () => {
        const turnTransition = new FlybyTurnTransition({
            flybyWaypoint: new Position(-22.943800, -43.717201),
            inboundCourse: 90,
            outboundCourse: 300,
            turnRadius: 2
        });

        expect(turnTransition.toPath().length).toBe(150);
        expect(pathToHash(turnTransition.toPath())).toBe("96d526a01c20d4e9d1f4f42e72c4b86453eec9dd");
    });

    test("turns with > 180° should throw an error", () => {
        expect(() => {
            new FlybyTurnTransition({
                flybyWaypoint: new Position(51.505699, 9.110910),
                inboundCourse: 270,
                outboundCourse: 90,
                turnRadius: 2
            });
        }).toThrowError("Turn direction indistinct");
    });
});
