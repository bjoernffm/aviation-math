import { DegreesTrue, NauticalMiles, TurnDirection } from "./common";
import { Position } from "./position";
import { projectBearingDistance } from "./projectBearingDistance";

export function projectTurnPosition(reference: Position, inboundCourse: DegreesTrue, outboundCourse: DegreesTrue, radius: NauticalMiles, turnDirection: TurnDirection) : Position
{
    let alpha1: number;
    let alpha2: number;

    if(turnDirection == TurnDirection.RIGHT) {
        alpha1 = inboundCourse+90;
        alpha2 = outboundCourse-90;
    } else {
        alpha1 = inboundCourse-90;
        alpha2 = outboundCourse+90;
    }

    let result1 = projectBearingDistance(reference, alpha1, radius);
    let result2 = projectBearingDistance(result1, alpha2, radius);

    return result2;
}
