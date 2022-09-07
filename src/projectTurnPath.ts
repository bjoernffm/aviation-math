import { clampAngle, Degrees, NauticalMiles, TurnDirection } from "./common";
import { Path } from "./path";
import { Position } from "./position";
import { projectTurnPosition } from "./projectTurnPosition";

export interface ProjectTurnPathInput
{
    startPosition: Position
    inboundCourse: Degrees
    outboundCourse: Degrees
    turnRadius: NauticalMiles
    turnDirection: TurnDirection
}

export function projectTurnPath(input: ProjectTurnPathInput) : Path
{
    const path = new Path();

    let currentHeading = input.inboundCourse;

    while (currentHeading != input.outboundCourse) {
        const position = projectTurnPosition(input.startPosition, input.inboundCourse, currentHeading, input.turnRadius, input.turnDirection);
        path.append(position);

        if (input.turnDirection == TurnDirection.LEFT) {
            currentHeading--;
        } else {
            currentHeading++;
        }

        currentHeading = clampAngle(currentHeading);
    }

    return path;
}
