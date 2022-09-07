import * as math from "mathjs";
import { clampAngle, coordinatesToSpherical, DegreesTrue, sphericalToCoordinates } from "./common";
import { projectBearingDistance } from "./projectBearingDistance";
import { getBearing } from "./getBearing";
import { Position } from "./position";

/**
 * Calculates the intercept points of two Coordinates and two bearings. The function
 * returns an array of two points since its projection on a sphere. The closer intersection
 * will be on the first item of the array.
 *
 * @example
 * const intersectionList = projectBearingIntersection(
 *     new Position(39.778889, -104.9825),
 *     0,
 *     new Position(43.778889, -102.9825),
 *     0,
 * );
 * // intersectionList[0].lat = 90
 * // intersectionList[1].lat = -90
 *
 * @param point1 The first position
 * @param bearing1 The first bearing
 * @param point2 The second position
 * @param bearing2 The second bearing
 * @returns An array with two intersection positions
 */
/* eslint-disable max-params */
export function projectBearingIntersection(position1: Position, bearing1: DegreesTrue, position2: Position, bearing2: DegreesTrue): [Position, Position] {
    const Pa11 = coordinatesToSpherical(position1);
    const point12 = projectBearingDistance(position1, clampAngle(bearing1), 500);
    const Pa12 = coordinatesToSpherical(point12);
    const Pa21 = coordinatesToSpherical(position2);
    const point22 = projectBearingDistance(position2, clampAngle(bearing2), 500);
    const Pa22 = coordinatesToSpherical(point22);

    const N1 = math.cross(Pa11, Pa12);
    const N2 = math.cross(Pa21, Pa22);

    const crossL = math.cross(N1, N2);
    const crossl = math.norm(crossL);

    const I1 = math.divide(crossL, crossl);

    const I2 = math.multiply(I1, -1);

    const s1 = sphericalToCoordinates(I1 as [number, number, number]);
    const s2 = sphericalToCoordinates(I2 as [number, number, number]);

    const brgTos1 = getBearing(position1, s1);
    const brgTos2 = getBearing(position1, s2);

    const delta1 = clampAngle(Math.round(Math.abs(clampAngle(bearing1) - brgTos1)));
    const delta2 = clampAngle(Math.round(Math.abs(clampAngle(bearing1) - brgTos2)));

    return [delta1 < delta2 ? s1 : s2, delta1 < delta2 ? s2 : s1];
}
