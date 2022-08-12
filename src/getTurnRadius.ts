import { Degrees, DegToRad, Knots, NauticalMiles } from "./common";

/**
 * This function calculates the turn radius of an airplane is nautical miles based
 * on its speed and the bank angle.
 * 
 * @example
 * const radius = getTurnRadius(450, 30);
 * // radius = ~5
 * 
 * @param speed The speed given in knots
 * @param bankAngle The bank angle in degrees
 * @returns The turn radius in nautical miles
 */
export function getTurnRadius(speed: Knots, bankAngle: Degrees) : NauticalMiles
{
    return (
        (speed/60)*(speed/60) /
        (18.96 * Math.tan(DegToRad(bankAngle)))
    );
}
