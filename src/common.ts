import { Position } from "./position";

export type Radians = number;

export type Degrees = number;
export type DegreesMagnetic = Degrees;
export type DegreesTrue = Degrees;
export type Feet = number;
export type Knots = number;
export type Latitude = Degrees;
export type Longitude = Degrees;
export type Metres = number;
export type Minutes = number;
export type NauticalMiles = number;

export function clampAngle(a: DegreesTrue): DegreesTrue {
    while (a >= 360) {
        a -= 360;
    }
    while (a < 0) {
        a += 360;
    }
    return a;
}
export function DegToRad(value: Degrees): Radians {
    return value * (Math.PI / 180);
}
export function RadToDeg(value: Radians): Degrees {
    return value * (180 / Math.PI);
}
export const robustAcos = (value: number): number => {
    if (value > 1) {
        return 1;
    }
    if (value < -1) {
        return -1;
    }

    return value;
};
export function coordinatesToSpherical(location: Position) {
    return [
        Math.cos(DegToRad(location.lat)) * Math.cos(DegToRad(location.lon)),
        Math.cos(DegToRad(location.lat)) * Math.sin(DegToRad(location.lon)),
        Math.sin(DegToRad(location.lat)),
    ];
}
export function sphericalToCoordinates(spherical: [number, number, number]): Position {
    return new Position(
        RadToDeg(Math.asin(spherical[2])),
        RadToDeg(Math.atan2(spherical[1], spherical[0]))
    );
}

export const MIN_LAT: Latitude = -90;
export const MAX_LAT: Latitude = 90;
export const MIN_LON: Longitude = -180;
export const MAX_LON: Longitude = 180;

export const EARTH_RADIUS: NauticalMiles = 3443.91846652;

export enum TurnDirection {
    LEFT,
    RIGHT
}
