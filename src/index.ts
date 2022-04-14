import { DegToRad, RadToDeg, robustAcos, DegreesTrue, EARTH_RADIUS, MIN_LON, MAX_LON, NauticalMiles } from './common';

export class Position {
    private _lat: number;
    private _lon: number;

    public constructor(lat: number, lon: number)
    {
        this._lat = lat;
        this._lon = lon;
    }

    public get lat()
    {
        return this._lat;
    }

    public get lon()
    {
        return this._lon;
    }
}

export class GeoMath {
    public static distance(from: Position, to: Position) : NauticalMiles {
        return Math.acos(
            robustAcos(
                Math.sin(DegToRad(to.lat)) * Math.sin(DegToRad(from.lat))
                    + Math.cos(DegToRad(to.lat))
                    * Math.cos(DegToRad(from.lat))
                    * Math.cos(DegToRad(from.lon - to.lon)),
            ),
        ) * EARTH_RADIUS;
    }

    public static placeBearingDistance(reference: Position, bearing: DegreesTrue, distance: NauticalMiles): Position {
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

    public static bearingTo(from: Position, to: Position): DegreesTrue {
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
}