import { Position, projectBearingIntersection } from "./index";

/* eslint-disable max-lines-per-function */
describe("greatCircleIntersection", () => {
    test("should return the north pole first then south pole when both bearings are (directly north)", () => {
        const intersection = projectBearingIntersection(
            new Position(39.778889, -104.9825),
            0,
            new Position(43.778889, -102.9825),
            0,
        );
        expect(
            intersection[0].lat,
        ).toEqual(90);
        expect(
            intersection[1].lat,
        ).toEqual(-90);
    });
    test("should return the south pole first then north pole when both bearings are 180 (directly south)", () => {
        const intersection = projectBearingIntersection(
            new Position(39.778889, -104.9825),
            180,
            new Position(43.778889, -102.9825),
            180,
        );
        expect(
            intersection[0].lat,
        ).toEqual(-90);
        expect(
            intersection[1].lat,
        ).toEqual(90);
    });
    test("should return a coordinate on the equator when both points are the same longitude and equidistant from equator", () => {
        const intersection = projectBearingIntersection(
            new Position(43, -104.9825),
            175,
            new Position(-43, -104.9825),
            5,
        );
        expect(
            intersection[0].lat,
        ).toEqual(0);
        expect(
            intersection[1].lat,
        ).toEqual(-0);
    });
    test("should return a coordinate half way between longitude wise when both bearings are part of isosceles triangle and both coordinates are same latitude", () => {
        const intersection = projectBearingIntersection(
            new Position(-43, 0),
            -45,
            new Position(-43, -90),
            45,
        );
        expect(
            intersection[0].lon,
        ).toBeGreaterThan(-45.01);
        expect(
            intersection[0].lon,
        ).toBeLessThan(-44.99);
        expect(
            intersection[1].lon,
        ).toBeLessThan(135.01);
        expect(
            intersection[1].lon,
        ).toBeGreaterThan(134.99);
    });
});
