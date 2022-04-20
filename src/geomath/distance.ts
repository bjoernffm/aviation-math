import { DegToRad, EARTH_RADIUS, NauticalMiles, robustAcos } from "../common";
import { Position } from "../position";

export function distance(from: Position, to: Position) : NauticalMiles {
    return Math.acos(
        robustAcos(
            Math.sin(DegToRad(to.lat)) * Math.sin(DegToRad(from.lat))
                + Math.cos(DegToRad(to.lat))
                * Math.cos(DegToRad(from.lat))
                * Math.cos(DegToRad(from.lon - to.lon)),
        ),
    ) * EARTH_RADIUS;
}
