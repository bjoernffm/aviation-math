import { DegreesTrue, NauticalMiles, TurnDirection } from "../common"
import { Path } from "../path"
import { Position } from "../position"
import { projectBearingDistance } from "../projectBearingDistance"

export interface ParallelTrackSearchPatternInput
{
    initialPosition: Position
    initialCourse: DegreesTrue
    initialTurn?: TurnDirection
    legLength?: NauticalMiles
    legSpacing?: NauticalMiles
    numberOfLegs?: number
}

export class ParallelTrackSearchPattern
{
    private _initialPosition: Position
    private _initialCourse: DegreesTrue
    private _initialTurn: TurnDirection
    private _legLength: NauticalMiles
    private _legSpacing: NauticalMiles
    private _numberOfLegs: number
    
    /**
     * Constructor method
     *
     * @param input The neccessary information to calculate the pattern
     */
    public constructor(input: ParallelTrackSearchPatternInput)
    {
        this._initialPosition = input.initialPosition;
        this._initialCourse = input.initialCourse;
        this._initialTurn = TurnDirection.RIGHT;
        this._legLength = 10;
        this._legSpacing = 1.5;
        this._numberOfLegs = 10;

        if('initialTurn' in input && input.initialTurn !== undefined) {
            this._initialTurn = input.initialTurn;
        }
        if('legLength' in input && input.legLength !== undefined) {
            this._legLength = input.legLength;
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
        let currentTurn = this._initialTurn;

        for(let i = 0; i < this._numberOfLegs; i++) {
            if(i > 0) {
                if(currentTurn == TurnDirection.RIGHT) {
                    path.append(projectBearingDistance(path.getLast(), currentCourse+90, this._legSpacing));
                    currentCourse += 180;
                    currentTurn = TurnDirection.LEFT;
                } else {
                    path.append(projectBearingDistance(path.getLast(), currentCourse-90, this._legSpacing));
                    currentCourse -= 180;
                    currentTurn = TurnDirection.RIGHT;
                }
            }
            path.append(projectBearingDistance(path.getLast(), currentCourse, this._legLength));
        }

        return path;
    }
}