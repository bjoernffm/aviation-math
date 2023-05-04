import { clampAngle, Degrees, NauticalMiles, TurnDirection } from "../common";
import { getCourseDelta } from "../getCourseDelta";
import { Path } from "../path";
import { Position } from "../position";
import { projectBearingIntersection } from "../projectBearingIntersection";
import { projectTurnPath } from "../projectTurnPath";
import { projectTurnPosition } from "../projectTurnPosition";
import { FlybyTurnTransition } from "../Transitions";
import { TurnTransition } from "./TurnTransition";

export interface FlyoverTurnTransitionInput
{
    flyoverWaypoint: Position
    inboundCourse: Degrees
    outboundCourse: Degrees
    turnRadius: NauticalMiles
    turnDirection: TurnDirection
}

/**
 * The FlyoverTurnTransition class represents a transition inbound to a waypoint
 * and overflying it. After the overfly the turn will be conducted to meet the outbound course.
 *
 * After initializing the class, a Path class can be retrieved using the toPath() method.
 */
export class FlyoverTurnTransition extends TurnTransition
{
    private _interceptCourse: Degrees;
    private _interceptPosition: Position;

    /**
     * Constructor method
     *
     * @param input The neccessary information to calculate the transition
     */
    public constructor(input: FlyoverTurnTransitionInput)
    {
        const courseDelta = getCourseDelta(input.inboundCourse, input.outboundCourse, input.turnDirection);
        if (Math.abs(courseDelta) < 60) {
            throw new Error();
        }
        if (Math.abs(courseDelta) > 300) {
            throw new Error();
        }

        const startPosition = input.flyoverWaypoint;
        const interceptAngle = 40;

        let interceptCourse = clampAngle(input.outboundCourse+interceptAngle);
        if (input.turnDirection == TurnDirection.LEFT) {
            interceptCourse = clampAngle(input.outboundCourse-interceptAngle);
        }

        const initialTurnEndPosition = projectTurnPosition(startPosition, input.inboundCourse, interceptCourse, input.turnRadius, input.turnDirection);
        const interceptPositions = projectBearingIntersection(startPosition, input.outboundCourse, initialTurnEndPosition, interceptCourse);
        const interceptPosition = interceptPositions[0];
        const endPosition = initialTurnEndPosition;

        super({...input, startPosition, endPosition});

        this._interceptCourse = interceptCourse;
        this._interceptPosition = interceptPosition;

        this._endPosition = this.generatePath().getLast();
    }

    public toPath() : Path
    {
        const turnPath = projectTurnPath({
            startPosition: this.startPosition,
            inboundCourse: this.inboundCourse,
            outboundCourse: this._interceptCourse,
            turnRadius: this.turnRadius,
            turnDirection: this.turnDirection
        });

        const flybyTurnTransition = new FlybyTurnTransition({
            flybyWaypoint: this._interceptPosition,
            inboundCourse: this._interceptCourse,
            outboundCourse: this.outboundCourse,
            turnRadius: this.turnRadius
        });

        turnPath.appendPath(flybyTurnTransition.toPath());

        this._path = turnPath;

        return turnPath;
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
