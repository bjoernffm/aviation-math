import { TurnDirection } from "../common";
import { Position } from "../position";
import { FlyoverTurnTransition } from "../";

/* eslint-disable max-lines-per-function */
describe("FlyoverTurnTransition", () => {
    test("left turn by 90°", () => {
        const turnTransition = new FlyoverTurnTransition({
            flyoverWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 270,
            outboundCourse: 180,
            turnRadius: 2,
            turnDirection: TurnDirection.LEFT
        });

        expect(turnTransition.startPosition.toDMSCode()).toBe(turnTransition.toPath().getFirst().toDMSCode());
        expect(turnTransition.endPosition.toDMSCode()).toBe(turnTransition.toPath().getLast().toDMSCode());

        expect(turnTransition.toPath().length).toBe(170);
        expect(turnTransition.toPath().hash).toBe("c557ec35801f8139f45f7be0411bc5f27d89c786");
    });

    test("left turn by 180°", () => {
        const turnTransition = new FlyoverTurnTransition({
            flyoverWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 270,
            outboundCourse: 90,
            turnRadius: 2,
            turnDirection: TurnDirection.LEFT
        });

        expect(turnTransition.toPath().length).toBe(260);
        expect(turnTransition.toPath().hash).toBe("9d63a0fbc1a4d8fc2231d35394760378a3a5062a");
    });

    test("left turn by 270°", () => {
        const turnTransition = new FlyoverTurnTransition({
            flyoverWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 270,
            outboundCourse: 0,
            turnRadius: 2,
            turnDirection: TurnDirection.LEFT
        });

        expect(turnTransition.toPath().length).toBe(350);
        expect(turnTransition.toPath().hash).toBe("f24ce3f5dbe83d6ab2c21a71dd841435252e22ad");
    });

    test("right turn by 90°", () => {
        const turnTransition = new FlyoverTurnTransition({
            flyoverWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 270,
            outboundCourse: 0,
            turnRadius: 2,
            turnDirection: TurnDirection.RIGHT
        });

        expect(turnTransition.toPath().length).toBe(170);
        expect(turnTransition.toPath().hash).toBe("992b0a79dd5838a7a44f4c0300e2d7c0f54609a9");
    });

    test("right turn by 180°", () => {
        const turnTransition = new FlyoverTurnTransition({
            flyoverWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 270,
            outboundCourse: 90,
            turnRadius: 2,
            turnDirection: TurnDirection.RIGHT
        });

        expect(turnTransition.toPath().length).toBe(260);
        expect(turnTransition.toPath().hash).toBe("7c1ac75b2623532a069a5091e06b1ae6ef2e2790");
    });

    test("right turn by 270", () => {
        const turnTransition = new FlyoverTurnTransition({
            flyoverWaypoint: new Position(51.505699, 9.110910),
            inboundCourse: 270,
            outboundCourse: 180,
            turnRadius: 2,
            turnDirection: TurnDirection.RIGHT
        });

        expect(turnTransition.toPath().length).toBe(350);
        expect(turnTransition.toPath().hash).toBe("918eb16d708d05abdc9fc258721233e2f3a0790d");
    });

    test("turn with more than 300 degrees", () => {
        expect(() => {
            new FlyoverTurnTransition({
                flyoverWaypoint: new Position(51.505699, 9.110910),
                inboundCourse: 270,
                outboundCourse: 300,
                turnRadius: 2,
                turnDirection: TurnDirection.LEFT
            });
        }).toThrowError();
    });

    test("turn with more than 60 degrees", () => {
        expect(() => {
            new FlyoverTurnTransition({
                flyoverWaypoint: new Position(51.505699, 9.110910),
                inboundCourse: 270,
                outboundCourse: 300,
                turnRadius: 2,
                turnDirection: TurnDirection.RIGHT
            });
        }).toThrowError();
    });
});
