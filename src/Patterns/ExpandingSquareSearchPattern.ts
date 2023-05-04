import { DegreesTrue, NauticalMiles, TurnDirection } from "../common"
import { Path } from "../path"
import { Position } from "../position"
import { projectBearingDistance } from "../projectBearingDistance"

export interface ExpandingSquareSearchPatternInput
{
    initialPosition: Position
    initialCourse: DegreesTrue
    initialTurn?: TurnDirection
    legLength?: NauticalMiles
    legSpacing?: NauticalMiles
    numberOfLegs?: number
}

export class ExpandingSquareSearchPattern
{
    private _initialPosition: Position
    private _initialCourse: DegreesTrue
    private _initialTurn: TurnDirection
    private _legSpacing: NauticalMiles
    private _numberOfLegs: number

    /**
     * Constructor method
     *
     * @param input The neccessary information to calculate the pattern
     */
    public constructor(input: ExpandingSquareSearchPatternInput)
    {
        this._initialPosition = input.initialPosition;
        this._initialCourse = input.initialCourse;
        this._initialTurn = TurnDirection.LEFT;
        this._legSpacing = 1;
        this._numberOfLegs = 10;

        if('initialTurn' in input && input.initialTurn !== undefined) {
            this._initialTurn = input.initialTurn;
        }
        if('legSpacing' in input && input.legSpacing !== undefined) {
            this._legSpacing = input.legSpacing;
        }
        if('numberOfLegs' in input && input.numberOfLegs !== undefined) {
            this._numberOfLegs = input.numberOfLegs;
        }
    }

    /**
     * 
     * @returns The calculated search pattern via a Path instance
     */
    public toPath(): Path
    {
        let path = new Path();
        path.append(this._initialPosition);
        
        let currentCourse = this._initialCourse;
        let currentLegLength = this._legSpacing;
        let turnBy = -90;
        if(this._initialTurn == TurnDirection.RIGHT) {
            turnBy = 90;
        }

        for(let i = 0; i < this._numberOfLegs; i++) {
            if(i > 0) {
                currentCourse += turnBy;
            }

            path.append(projectBearingDistance(path.getLast(), currentCourse, currentLegLength));

            if((i+1) % 2 == 0) {
                currentLegLength += this._legSpacing;
            }
        }

        return path;
    }
}