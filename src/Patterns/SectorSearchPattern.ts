import { DegreesTrue, NauticalMiles, TurnDirection } from "../common"
import { Path } from "../path"
import { Position } from "../position"
import { projectBearingDistance } from "../projectBearingDistance"

export interface SectorSearchPatternInput
{
    initialPosition: Position
    initialCourse: DegreesTrue
    initialTurn?: TurnDirection
    legLength?: NauticalMiles
}

export class SectorSearchPattern
{
    private _initialPosition: Position
    private _initialCourse: DegreesTrue
    private _initialTurn: TurnDirection
    private _legLength: NauticalMiles
    
    /**
     * Constructor method
     *
     * @param input The neccessary information to calculate the pattern
     */
    public constructor(input: SectorSearchPatternInput)
    {
        this._initialPosition = input.initialPosition;
        this._initialCourse = input.initialCourse;
        this._initialTurn = TurnDirection.LEFT;
        this._legLength = 5;

        if('initialTurn' in input && input.initialTurn !== undefined) {
            this._initialTurn = input.initialTurn;
        }
        if('legLength' in input && input.legLength !== undefined) {
            this._legLength = input.legLength;
        }
    }

    /**
     * 
     * @returns The calculated search pattern via a Path instance
     */
    public toPath()
    {
        let path = new Path();
        path.append(this._initialPosition);
        let currentCourse = this._initialCourse;
        let turnBy = -120;
        if(this._initialTurn == TurnDirection.RIGHT) {
            turnBy = 120;
        }

        for(let i = 0; i < 7; i++) {
            if(i > 0) {
                currentCourse += turnBy;
            }

            if(i == 2 || i == 4) {
                path.append(projectBearingDistance(path.getLast(), currentCourse, this._legLength*2));
            } else {
                path.append(projectBearingDistance(path.getLast(), currentCourse, this._legLength));
            }
        }

        return path;
    }
}