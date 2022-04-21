import { DegreesTrue, DegToRad, EARTH_RADIUS, MAX_LON, MIN_LON, NauticalMiles, RadToDeg } from "./common";
import { Position } from "./position";

export function placeBearingDistance(reference: Position, bearing: DegreesTrue, distance: NauticalMiles): Position {
    const delta = distance / EARTH_RADIUS;

    const lat = RadToDeg(Math.asin(
        Math.sin(DegToRad(reference.lat)) * Math.cos(delta)
        + Math.cos(DegToRad(reference.lat)) * Math.sin(delta) * Math.cos(DegToRad(bearing)),
    ));

    let long = reference.lon
        + RadToDeg(Math.atan2(
            Math.sin(DegToRad(bearing)) * Math.sin(delta) * Math.cos(DegToRad(reference.lat)),
            Math.cos(delta) - Math.sin(DegToRad(reference.lat)) * Math.sin(DegToRad(lat)),
        ));

    if (long < MIN_LON || long > MAX_LON) {
        long = ((long + 540) % (360)) - 180;
    }

    return new Position(lat, long);
}
