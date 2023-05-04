import { TurnDirection } from "../common";
import { Position } from "../position";
import { SectorSearchPattern } from "../";

/* eslint-disable max-lines-per-function */
describe("SectorSearchPattern", () => {
    test("Minimal initialization", () => {
        const pattern = new SectorSearchPattern({
            initialPosition: new Position(50.276275000, 8.848625000),
            initialCourse: 60
        });

        expect(pattern.toPath().toFlightplan()).toBe("501634N0085055E 501904N0085741E 502133N0085054E 501134N0085054E 501404N0085740E 501902N0084407E 501403N0084407E 501633N0085053E");
    });

    test("Full initialization", () => {
        const pattern = new SectorSearchPattern({
            initialPosition: new Position(50.276275000, 8.848625000),
            initialCourse: 280,
            initialTurn: TurnDirection.RIGHT,
            legLength: 10
        });

        expect(pattern.toPath().toFlightplan()).toBe("501634N0085055E 501817N0083531E 502555N0084535E 500709N0085614E 500852N0084054E 502408N0090102E 501445N0090622E 501628N0085059E");
    });
});
