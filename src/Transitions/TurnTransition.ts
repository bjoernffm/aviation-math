import { clampAngle, Degrees, NauticalMiles, TurnDirection } from "../common";
import { getCourseDelta } from "../getCourseDelta";
import { Path } from "../path";
import { Position } from "../position";

export interface TurnTransitionInput {
    inboundCourse: Degrees
    outboundCourse: Degrees
    startPosition: Position
    endPosition: Position
    turnRadius: NauticalMiles
    turnDirection: TurnDirection
}

/**
 * Base class for transitions from one point to another
 */
export abstract class TurnTransition
{
    protected _inboundCourse: Degrees;
    protected _outboundCourse: Degrees;
    protected _courseDelta: Degrees;
    protected _startPosition: Position;
    protected _endPosition: Position;
    protected _turnRadius: NauticalMiles;
    protected _turnDirection: TurnDirection;
    protected _path: Path = new Path();

    /**
     * Constructs the class
     *
     * @param inboundCourse The inbound course entering the transition
     * @param outboundCourse The outbound course leaving the transition
     * @param startPosition The position to start the transition
     * @param endPosition The position to end the transition
     */
    public constructor(input: TurnTransitionInput)
    {
        this._inboundCourse = clampAngle(input.inboundCourse);
        this._outboundCourse = clampAngle(input.outboundCourse);
        this._startPosition = input.startPosition;
        this._endPosition = input.endPosition;
        this._turnRadius = input.turnRadius;
        this._turnDirection = input.turnDirection;

        this._courseDelta = getCourseDelta(input.inboundCourse, input.outboundCourse, input.turnDirection);
    }

    public get inboundCourse(): Degrees
    {
        return this._inboundCourse;
    }

    public get outboundCourse(): Degrees
    {
        return this._outboundCourse;
    }

    public get courseDelta(): Degrees
    {
        return this._courseDelta;
    }

    public get startPosition(): Position
    {
        return this._startPosition;
    }

    public get endPosition(): Position
    {
        return this._endPosition;
    }

    public get turnRadius(): NauticalMiles
    {
        return this._turnRadius;
    }

    public get turnDirection(): TurnDirection
    {
        return this._turnDirection;
    }

    /**
     * @deprecated
     * @returns Path
     */
    abstract generatePath(): Path;

    abstract toPath(): Path;
}
