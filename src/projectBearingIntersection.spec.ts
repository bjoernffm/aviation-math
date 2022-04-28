import { Position, projectBearingIntersection } from "./index";

describe("greatCircleIntersection", () => {
    test("should return the north pole first then south pole when both bearings are (directly north)", () => {
        const a = projectBearingIntersection(
            new Position(39.778889, -104.9825),
            0,
            new Position(43.778889, -102.9825),
            0,
        );
        expect(
            a[0].lat,
        ).toEqual(90);
        expect(
            a[1].lat,
        ).toEqual(-90);
    });
    test("should return the south pole first then north pole when both bearings are 180 (directly south)", () => {
        const a = projectBearingIntersection(
            new Position(39.778889, -104.9825),
            180,
            new Position(43.778889, -102.9825),
            180,
        );
        expect(
            a[0].lat,
        ).toEqual(-90);
        expect(
            a[1].lat,
        ).toEqual(90);
    });
    test("should return a coordinate on the equator when both points are the same longitude and equidistant from equator", () => {
        const a = projectBearingIntersection(
            new Position(43, -104.9825),
            175,
            new Position(-43, -104.9825),
            5,
        );
        expect(
            a[0].lat,
        ).toEqual(0);
        expect(
            a[1].lat,
        ).toEqual(-0);
    });
    test("should return a coordinate half way between longitude wise when both bearings are part of isosceles triangle and both coordinates are same latitude", () => {
        const a = projectBearingIntersection(
            new Position(-43, 0),
            -45,
            new Position(-43, -90),
            45,
        );
        expect(
            a[0].lon,
        ).toBeGreaterThan(-45.01);
        expect(
            a[0].lon,
        ).toBeLessThan(-44.99);
        expect(
            a[1].lon,
        ).toBeLessThan(135.01);
        expect(
            a[1].lon,
        ).toBeGreaterThan(134.99);
    });
});