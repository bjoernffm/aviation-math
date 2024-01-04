import * as math from "mathjs";
import { Degrees, FeetPerMinute, Knots, RadToDeg } from "./common";

/**
 * This function calculates the turn radius of an airplane is nautical miles based
 * on its speed and the bank angle.
 *
 * @example
 * const angle = getVerticalFlightpathAngle(
 *     100, // speed in knots
 *     530  // bank angle
 * );
 * // angle = ~-3
 *
 * @param speed The speed given in knots
 * @param bankAngle The bank angle in degrees
 * @returns The flightpath angle in degrees
 */
export function getVerticalFlightpathAngle(speed: Knots, descentRate: FeetPerMinute) : Degrees
{
    math.createUnit("knot", {definition: "0.514444 m/s", aliases: ["knots", "kt", "kts"]}, {override: true});

    // both speeds need to be in the same unit (meters per second)
    const groundSpeedWithUnit = math.unit(speed, "knot");
    const descentRateWithUnit = math.unit(descentRate, "ft/min");

    const percentage = math.divide(descentRateWithUnit, groundSpeedWithUnit) as number;

    return RadToDeg(math.atan(percentage));
}
