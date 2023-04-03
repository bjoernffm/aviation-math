import { NauticalMiles } from "./common";
import { getBearing } from "./getBearing";
import { getCourseDelta } from "./getCourseDelta";
import { getDistance } from "./getDistance";
import { Position } from "./position";
import { projectBearingIntersection } from "./projectBearingIntersection";

/**
 * This function calculates the turn radius of an airplane is nautical miles based
 * on its speed and the bank angle.
 *
 * @example
 * const fromWaypoint = new Position(50.05287016855733, 8.604134220238294);
 * const toWaypoint = new Position(50.06464380794873, 8.727017823182248);
 * const currentPosition = new Position(50.06863993838378, 8.64539363827948);
 *
 * const offsetData = getTrackOffset(fromWaypoint, toWaypoint, currentPosition);
 * // offsetData = {
 * //     pointOnTrack -> 500325N0083853E
 * //     offset -> 0.7015654314682891
 * // }
 *
 * @param fromWaypoint Start position of the track
 * @param toWaypoint End position of the track
 * @param currentPosition Position to calculate the orthogonal offset from
 * @returns An object including the interception on the track and the offset in nautical miles
 */
export function isPositionBetween(position1: Position, position2: Position, positionToCheck: Position): boolean
{
    const bearing1 = getBearing(position1, position2);
    const checkBearing1 = getBearing(position1, positionToCheck);
    const deltaCourse1 = Math.abs(getCourseDelta(bearing1, checkBearing1));
    
    const bearing2 = getBearing(position2, position1);
    const checkBearing2 = getBearing(position2, positionToCheck);
    const deltaCourse2 = Math.abs(getCourseDelta(bearing2, checkBearing2));

    if (deltaCourse1 < 90 && deltaCourse2 < 90) {
        return true;
    }

    return false;
}
