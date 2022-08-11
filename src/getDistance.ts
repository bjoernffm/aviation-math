import { DegToRad, EARTH_RADIUS, NauticalMiles, robustAcos } from "./common";
import { Position } from "./position";

/**
 * Measure the distance from one station to another
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
