import { Path, Position } from "./index";

/* eslint-disable max-lines-per-function */
describe("Path class", () => {
    test("attributes if initialized empty", () => {
        const path = new Path();

        expect(path.length).toEqual(0);
        expect(path.get(0)).toBeUndefined();
        expect(path.getFirst()).toBeUndefined();
        expect(path.getLast()).toBeUndefined();
        expect(path.toFlightplan()).toEqual("");
    });

    test("attributes if initialized with points", () => {
        const path = new Path([new Position(54, 9), new Position(55, 10)]);

        expect(path.length).toEqual(2);
        expect(path.get(-1)).toBeUndefined();
        expect(path.get(0).lat).toEqual(54);
        expect(path.get(1).lat).toEqual(55);
        expect(path.get(2)).toBeUndefined();
        expect(path.getFirst().lat).toEqual(54);
        expect(path.getLast().lat).toEqual(55);
        expect(path.toFlightplan()).toEqual("540000N0090000E 550000N0100000E");
    });

    test("appending of positions", () => {
        const path = new Path([new Position(53, 8)]);
        path.append(new Position(54, 9));
        path.append(new Position(55, 10));

        expect(path.length).toEqual(3);
        expect(path.toFlightplan()).toEqual("530000N0080000E 540000N0090000E 550000N0100000E");
    });

    test("appending of path", () => {
        const path = new Path();
        path.appendPath(new Path([new Position(54, 9), new Position(55, 10)]));

        expect(path.length).toEqual(2);
        expect(path.toFlightplan()).toEqual("540000N0090000E 550000N0100000E");
    });

    test("distance of path using append", () => {
        const path = new Path();
        path.append(new Position(50.039342606427844, 8.563553936503006));
        path.append(new Position(51.41772471633502, 9.387837439331479));

        expect(path.length).toEqual(2);
        expect(path.distance).toBeCloseTo(88.59);

        path.append(new Position(53.046938293455646, 8.789498590264865));

        expect(path.distance).toBeCloseTo(188.96);

        const path2 = new Path();
        path2.appendPath(path);

        expect(path2.distance).toBeCloseTo(188.96);
    });

    test("distance of path using constructor", () => {
        const path = new Path([
            new Position(50.039342606427844, 8.563553936503006),
            new Position(51.41772471633502, 9.387837439331479),
            new Position(53.046938293455646, 8.789498590264865)
        ]);

        expect(path.distance).toBeCloseTo(188.96);
    });
});
