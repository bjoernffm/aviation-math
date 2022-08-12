import { DegToRad, EARTH_RADIUS, NauticalMiles, robustAcos } from "./common";
import { Position } from "./position";

/**
 * Measure the distance from one position to another
 * 
 * @example
 * let distance = getDistance(
 *     new Position(50.0379326, 8.5599631),
 *     new Position(40.6413113, -73.780327)
 * );
 * // distance = 13345.2785...
 * 
 * @param from Initial Position where to get the distance from
 * @param to Position where to get the distance to
 * @returns The distance in nautical miles
 */
export function getDistance(from: Position, to: Position) : NauticalMiles {
    return Math.acos(
        robustAcos(
            Math.sin(DegToRad(to.lat)) * Math.sin(DegToRad(from.lat))
                + Math.cos(DegToRad(to.lat))
                * Math.cos(DegToRad(from.lat))
                * Math.cos(DegToRad(from.lon - to.lon)),
        ),
    ) * EARTH_RADIUS;
}
