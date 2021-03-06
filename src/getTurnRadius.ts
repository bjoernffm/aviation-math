import { Degrees, DegToRad, Knots, NauticalMiles } from "./common";

export function getTurnRadius(speed: Knots, bankAngle: Degrees) : NauticalMiles
{
    return (
        (speed/60)*(speed/60) /
        (18.96 * Math.tan(DegToRad(bankAngle)))
    );
}
