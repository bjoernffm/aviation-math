import { DegreesTrue, DegToRad, RadToDeg } from "./common";
import { Position } from "./position";

/**
 * Measure the bearing from one station to another
 * 
 * @example
 * let bearing = getBearing(
 *     new Position(39.778889, -104.9825),
 *     new Position(43.778889, -102.9825)
 * );
 * // bearing = 19.7875...
 * 
 * @param from Position where to get the bearing from
 * @param to Position where to get the bearing to
 * @returns The bearing in true degrees
 */
export function getBearing(from: Position, to: Position): DegreesTrue {
    return (RadToDeg(Math.atan2(
        Math.sin(DegToRad(to.lon - from.lon))
                * Math.cos(DegToRad(to.lat)),
        Math.cos(DegToRad(from.lat)) * Math.sin(DegToRad(to.lat))
                - Math.sin(DegToRad(from.lat))
                * Math.cos(DegToRad(to.lat))
                * Math.cos(DegToRad(to.lon - from.lon)),
    )) + 360)
    % 360;
}
