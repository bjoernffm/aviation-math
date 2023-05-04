import { getTrackOffset, Position } from ".";

describe("getTrackOffset", () => {
    test("works for north of the track", () => {
        const fromWaypoint = new Position(50.05287016855733, 8.604134220238294);
        const toWaypoint = new Position(50.06464380794873, 8.727017823182248);
        const position = new Position(50.06863993838378, 8.64539363827948);

        const offsetData = getTrackOffset(fromWaypoint, toWaypoint, position);

        expect(offsetData.pointOnTrack.toDMSCode()).toBe("500325N0083853E");
        expect(offsetData.offset).toBeCloseTo(0.7015654314682891);
    });

    test("works for south of the track", () => {
        const fromWaypoint = new Position(50.05287016855733, 8.604134220238294);
        const toWaypoint = new Position(50.06464380794873, 8.727017823182248);
        const position = new Position(50.04881637873754, 8.640640284584764);

        const offsetData = getTrackOffset(fromWaypoint, toWaypoint, position);

        expect(offsetData.pointOnTrack.toDMSCode()).toBe("500322N0083820E");
        expect(offsetData.offset).toBeCloseTo(0.4497494593538925);
    });
});
