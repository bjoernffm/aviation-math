import { clampAngle, Degrees, TurnDirection } from "./common";

function bringBelowLimit(input: number, limit: number): number
{
    while (input > limit) {
        input -= 360;
    }

    return input;
}

function bringAboveLimit(input: number, limit: number): number
{
    while (input < limit) {
        input += 360;
    }

    return input;
}

/**
 * Returns the delta of inbound and outbound course.
 * If the turn direction is given, 359 degree turns
 * are possible at max. If no turn direction is omitted,
 * less than 180 degree turns are possible.
 *
 * @example
 * let delta = getCourseDelta(
 *     180, // inbound course
 *     90   // outbound course
 * );
 * // delta = -90 // left turn, no initial turn direction given
 *
 * @param inboundCourse Initial course inbound
 * @param outboundCourse Eventual course outbound
 * @param turnDirection Optional direction of turn (left or right)
 * @returns The delta between inbound and outbound course. Negative results
 * indicate a left turn, positive results indicate a right turn.
 */
export function getCourseDelta(inboundCourse: Degrees, outboundCourse: Degrees, turnDirection?: TurnDirection) : Degrees
{
    let delta = outboundCourse - inboundCourse;

    outboundCourse = clampAngle(outboundCourse);
    inboundCourse = clampAngle(inboundCourse);

    if (typeof turnDirection === "undefined") {
        delta = bringAboveLimit(delta, -180);
        delta = bringBelowLimit(delta, 180);

        if (Math.abs(delta) === 180) {
            throw new Error("Turn direction indistinct");
        }
    } else {
        if (turnDirection == TurnDirection.RIGHT) {
            delta = bringAboveLimit(delta, 0);
        } else {
            delta = bringBelowLimit(delta, 0);
        }
    }

    return delta;
}
