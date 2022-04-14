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

export const MIN_LAT: Latitude = -90;
export const MAX_LAT: Latitude = 90;
export const MIN_LON: Longitude = -180;
export const MAX_LON: Longitude = 180;

export const EARTH_RADIUS: NauticalMiles = 3443.91846652;