import { TurnDirection } from "../common";
import { Position } from "../position";
import { ExpandingSquareSearchPattern } from "../";

/* eslint-disable max-lines-per-function */
describe("ExpandingSquareSearchPattern", () => {
    test("Minimal initialization", () => {
        const pattern = new ExpandingSquareSearchPattern({
            initialPosition: new Position(50.276275000, 8.848625000),
            initialCourse: 60
        });

        expect(pattern.toPath().toFlightplan()).toBe("501634N0085055E 501704N0085216E 501756N0085129E 501656N0084847E 501512N0085020E 501642N0085424E 501918N0085203E 501718N0084638E 501350N0084945E 501620N0085631E 502039N0085237E");
    });

    test("Full initialization", () => {
        const pattern = new ExpandingSquareSearchPattern({
            initialPosition: new Position(50.276275000, 8.848625000),
            initialCourse: 280,
            initialTurn: TurnDirection.RIGHT,
            legSpacing: 2,
            numberOfLegs: 20
        });

        expect(pattern.toPath().toFlightplan()).toBe("501634N0085055E 501655N0084750E 501853N0084823E 501811N0085432E 501415N0085327E 501517N0084413E 502111N0084551E 501947N0085810E 501155N0085600E 501338N0084038E 502328N0084321E 502122N0090151E 500934N0085836E 501158N0083706E 502543N0084055E 502254N0090535E 500710N0090115E 501014N0083337E 502756N0083832E 502424N0090922E 500444N0090358E");
    });
});
