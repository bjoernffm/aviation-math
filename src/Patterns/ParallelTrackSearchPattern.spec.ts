import { TurnDirection } from "../common";
import { Position } from "../position";
import { ParallelTrackSearchPattern } from "../";

describe("ParallelTrackSearchPattern", () => {
    test("Minimal initialization", () => {
        const pattern = new ParallelTrackSearchPattern({
            initialPosition: new Position(50.276275000, 8.848625000),
            initialCourse: 60
        });

        expect(pattern.toPath().toFlightplan()).toBe("501634N0085055E 502133N0090428E 502015N0090538E 501515N0085207E 501357N0085317E 501856N0090649E 501738N0090800E 501238N0085429E 501120N0085539E 501618N0090911E 501501N0091021E 501000N0085651E 500843N0085801E 501341N0091132E 501223N0091242E 500723N0085913E 500605N0090023E 501104N0091353E 500946N0091503E 500446N0090135E");
    });

    test("Full initialization", () => {
        const pattern = new ParallelTrackSearchPattern({
            initialPosition: new Position(50.276275000, 8.848625000),
            initialCourse: 280,
            initialTurn: TurnDirection.LEFT,
            legLength: 12,
            legSpacing: 2,
            numberOfLegs: 8
        });

        expect(pattern.toPath().toFlightplan()).toBe("501634N0085055E 501837N0083226E 501639N0083154E 501433N0085020E 501235N0084948E 501439N0083121E 501241N0083049E 501034N0084914E 500836N0084841E 501040N0083016E 500842N0082944E 500636N0084807E 500438N0084735E 500641N0082911E 500443N0082839E 500237N0084701E");
    });
});
