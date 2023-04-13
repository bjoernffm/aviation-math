import { getBearing } from "./getBearing";
import { getCourseDelta } from "./getCourseDelta";
import { Position } from "./position";

/**
 * This function calculates the turn radius of an airplane is nautical miles based
 * on its speed and the bank angle.
 *
 * @example
 * const fromPosition = new Position("493816N0071556E");
 * const toPosition = new Position("494707N0072853E");
 * const positionToCheck = new Position("494534N0071807E")
 * const result = isPositionBetween(fromPosition, toPosition, positionToCheck);
 * // result = true
 * // positionToCheck is between pos1 and pos2
 *
 * @param fromPosition Start position of the track
 * @param toPosition End position of the track
 * @param currentPosition Position to calculate the orthogonal offset from
 * @returns An object including the interception on the track and the offset in nautical miles
 */
export function isPositionBetween(fromPosition: Position, toPosition: Position, positionToCheck: Position): boolean
{
    const bearing1 = getBearing(fromPosition, toPosition);
    const checkBearing1 = getBearing(fromPosition, positionToCheck);
    const deltaCourse1 = Math.abs(getCourseDelta(bearing1, checkBearing1));

    const bearing2 = getBearing(toPosition, fromPosition);
    const checkBearing2 = getBearing(toPosition, positionToCheck);
    const deltaCourse2 = Math.abs(getCourseDelta(bearing2, checkBearing2));

    if (deltaCourse1 < 90 && deltaCourse2 < 90) {
        return true;
    }

    return false;
}
