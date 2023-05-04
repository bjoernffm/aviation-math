import { clampAngle, Degrees, DegToRad, NauticalMiles, TurnDirection } from "../common";
import { getCourseDelta } from "../getCourseDelta";
import { Path } from "../path";
import { Position } from "../position";
import { projectBearingDistance } from "../projectBearingDistance";
import { projectTurnPosition } from "../projectTurnPosition";
import { TurnTransition } from "./TurnTransition";

export interface FlybyTurnTransitionInput
{
    flybyWaypoint: Position
    inboundCourse: Degrees
    outboundCourse: Degrees
    turnRadius: NauticalMiles
}

/**
 * The FlybyTurnTransition class represents a transition inbound to a waypoint
 * not overflying the waypoint but turning to the outbound course before reaching it.
 *
 * After initializing the class, a Path class can be retrieved using the toPath() method.
 */
export class FlybyTurnTransition extends TurnTransition
{
    /**
     * Constructor method
     *
     * @param input The neccessary information to calculate the transition
     */
    public constructor(input: FlybyTurnTransitionInput)
    {
        const courseDelta = getCourseDelta(input.inboundCourse, input.outboundCourse);
        let turnDirection = TurnDirection.LEFT;
        if (courseDelta > 0) {
            turnDirection = TurnDirection.RIGHT;
        }

        const breakoutDistance: NauticalMiles = Math.abs(Math.tan(DegToRad(courseDelta / 2))) * input.turnRadius;

        const startPosition = projectBearingDistance(input.flybyWaypoint, input.inboundCourse-180, breakoutDistance);
        const endPosition = projectBearingDistance(input.flybyWaypoint, input.outboundCourse, breakoutDistance);

        super({...input, startPosition, endPosition, turnDirection});

        this._endPosition = this.generatePath().getLast();
    }

    
    public toPath(): Path
    {
        const path = new Path();
        let currentHeading = this.inboundCourse;

        while (currentHeading != this.outboundCourse) {
            const position = projectTurnPosition(this.startPosition, this.inboundCourse, currentHeading, this.turnRadius, this.turnDirection);
            path.append(position);

            if (this.turnDirection == TurnDirection.LEFT) {
                currentHeading--;
            } else {
                currentHeading++;
            }

            currentHeading = clampAngle(currentHeading);
        }

        this._path = path;

        return path;
    }

    /**
     * @deprecated
     * @returns Path
     */
    public generatePath(): Path
    {
        return this.toPath();
    }
}
