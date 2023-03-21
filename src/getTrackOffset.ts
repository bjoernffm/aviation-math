import { NauticalMiles } from "./common";
import { getBearing } from "./getBearing";
import { getDistance } from "./getDistance";
import { Position } from "./position";
import { projectBearingIntersection } from "./projectBearingIntersection";

export interface OffsetData {
    pointOnTrack: Position,
    offset: NauticalMiles,
}

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
export function getTrackOffset(fromWaypoint: Position, toWaypoint: Position, currentPosition: Position): OffsetData
{
    const trackCourse = getBearing(fromWaypoint, toWaypoint);
    const orthogonalCourse = trackCourse + 90;

    const interceptionPoints = projectBearingIntersection(fromWaypoint, trackCourse, currentPosition, orthogonalCourse);
    const pointOnTrack = interceptionPoints[0];
    const offset = getDistance(currentPosition, pointOnTrack);

    return {
        pointOnTrack,
        offset
    };
}
