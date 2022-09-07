import { DegreesTrue, DegToRad, EARTH_RADIUS, MAX_LON, MIN_LON, NauticalMiles, RadToDeg } from "./common";
import { Position } from "./position";

/**
 * This function projects/calculates a position based on a reference position, bearing and distance.
 *
 * @example
 * const result = projectBearingDistance(
 *     new Position(52.518611, 13.408056),
 *     180,
 *     8.09935205184,
 * );
 * // result.lat = 52.3838...
 * // result.lon = 13.4080...
 *
 * @param reference The position to start the projection from
 * @param bearing The direction in true degrees to project to
 * @param distance The distance from the reference in nautical miles
 * @returns The projected position
 */
export function projectBearingDistance(reference: Position, bearing: DegreesTrue, distance: NauticalMiles): Position {
    const delta = distance / EARTH_RADIUS;

    const lat = RadToDeg(Math.asin(
        (Math.sin(DegToRad(reference.lat)) * Math.cos(delta)) +
        (Math.cos(DegToRad(reference.lat)) * Math.sin(delta) * Math.cos(DegToRad(bearing))),
    ));

    let long = reference.lon +
        RadToDeg(Math.atan2(
            Math.sin(DegToRad(bearing)) * Math.sin(delta) * Math.cos(DegToRad(reference.lat)),
            Math.cos(delta) - (Math.sin(DegToRad(reference.lat)) * Math.sin(DegToRad(lat))),
        ));

    if (long < MIN_LON || long > MAX_LON) {
        long = ((long + 540) % (360)) - 180;
    }

    return new Position(lat, long);
}
