import { DegreesTrue, NauticalMiles, TurnDirection } from "./common";
import { Position } from "./position";
import { projectBearingDistance } from "./projectBearingDistance";

/**
 * Projects the eventual position of a turn starting at a reference position
 *
 * @example
 * const result = projectTurnPosition(
 *     new Position(50.0379326, 8.5599631),
 *     270,
 *     90,
 *     4,
 *     TurnDirection.LEFT
 * );
 * // result.lat = 49.9048...
 * // result.lon = 8.5599...
 *
 * @param reference The start position of the turn
 * @param inboundCourse Course to start the turn inbound the reference position
 * @param outboundCourse Course to end the turn with
 * @param radius The turn radius in nautical miles
 * @param turnDirection Turn direction (left or right)
 * @returns The eventual position of the turn where course is outboundCourse
 */
/* eslint-disable max-params */
export function projectTurnPosition(reference: Position, inboundCourse: DegreesTrue, outboundCourse: DegreesTrue, radius: NauticalMiles, turnDirection: TurnDirection) : Position
{
    let alpha1: number;
    let alpha2: number;

    if (turnDirection == TurnDirection.RIGHT) {
        alpha1 = inboundCourse+90;
        alpha2 = outboundCourse-90;
    } else {
        alpha1 = inboundCourse-90;
        alpha2 = outboundCourse+90;
    }

    const result1 = projectBearingDistance(reference, alpha1, radius);
    const result2 = projectBearingDistance(result1, alpha2, radius);

    return result2;
}
