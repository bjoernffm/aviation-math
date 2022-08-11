import { Degrees, DegToRad, NauticalMiles } from "./common";
import { Position } from "./position";
import { projectBearingDistance } from "./projectBearingDistance";

export interface FlybyTurnTransition {
    inboundCourse: Degrees
    outboundCourse: Degrees
    courseDelta: Degrees
    startPosition: Position
    endPosition: Position
    breakoutDistance: NauticalMiles
}

export function getFlybyTurnTransition(reference: Position, inboundCourse: Degrees, outboundCourse: Degrees, turnRadius: NauticalMiles): FlybyTurnTransition | void
{
    const courseDelta = outboundCourse - inboundCourse;
    const breakoutDistance: NauticalMiles = Math.abs(Math.tan(DegToRad(courseDelta / 2))) * turnRadius;

    const startPosition = projectBearingDistance(reference, inboundCourse+180, breakoutDistance);
    const endPosition = projectBearingDistance(reference, outboundCourse, breakoutDistance);

    return {
        inboundCourse,
        outboundCourse,
        courseDelta,
        startPosition,
        endPosition,
        breakoutDistance
    };
}