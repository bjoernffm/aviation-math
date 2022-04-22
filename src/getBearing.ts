import { DegreesTrue, DegToRad, RadToDeg } from "./common";
import { Position } from "./position";

export function getBearing(from: Position, to: Position): DegreesTrue {
    return (RadToDeg(Math.atan2(
        Math.sin(DegToRad(to.lon - from.lon))
                * Math.cos(DegToRad(to.lat)),
        Math.cos(DegToRad(from.lat)) * Math.sin(DegToRad(to.lat))
                - Math.sin(DegToRad(from.lat))
                * Math.cos(DegToRad(to.lat))
                * Math.cos(DegToRad(to.lon - from.lon)),
    )) + 360)
    % 360;
}
