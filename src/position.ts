// see http://www.c-dev.ch/2012/10/26/koordinatenformate/ for formatting
import * as geomag from "geomag";
import { PositionParser } from "./PositionParser";

/**
 * This class is a container for a position based on geo coordinates.
 */
export class Position {
    private _lat: number;
    private _lon: number;

    /**
     * The constructor offers the possibility of instatiating the class with
     * parameters lat and lon, or by just using the first parameter lat with
     * a formatted position given.
     * 
     * @example
     * const pos1 = new Position(35.161372664038055, 33.267828863069205);
     * const pos2 = new Position("35.161372664038055 N 33.267828863069205 E");
     * const pos3 = new Position("40° 7.38' 74° 7.38'");
     * 
     * @param lat The latitude part of the position as a number or a formatted position string
     * @param lon The optional longitude
     */
    public constructor(lat: number | string, lon?: number)
    {
        if(typeof lat === "string") {
            const result = PositionParser.parse(lat);
            this._lat = result.lat;
            this._lon = result.lon;
        } else {
            this._lat = lat as number;
            this._lon = lon as number;
        }
    }

    public get lat(): number
    {
        return this._lat;
    }

    public get lon(): number
    {
        return this._lon;
    }

    public get latDegrees(): number
    {
        return Math.trunc(this._lat);
    }

    public get lonDegrees(): number
    {
        return Math.trunc(this._lon);
    }

    public get latDegreesAbs(): number
    {
        return Math.abs(this.latDegrees);
    }

    public get lonDegreesAbs(): number
    {
        return Math.abs(this.lonDegrees);
    }

    public get latMinutes(): number
    {
        return (this.lat % 1) * 60;
    }

    public get lonMinutes(): number
    {
        return (this.lon % 1) * 60;
    }

    public get latSeconds(): number
    {
        return (this.latMinutes % 1) * 60;
    }

    public get lonSeconds(): number
    {
        return (this.lonMinutes % 1) * 60;
    }

    public get latHemisphere(): string
    {
        if(this.isNorthernHemisphere) {
            return "N";
        }
        
        return "S";
    }

    public get lonHemisphere(): string
    {
        if(this.isEasternHemisphere) {
            return "E";
        }
        
        return "W";
    }

    public get isNorthernHemisphere(): boolean
    {
        if(this._lat >= 0) {
            return true;
        }
        
        return false;
    }

    public get isSouthernHemisphere(): boolean
    {
        return !this.isNorthernHemisphere;
    }

    public get isEasternHemisphere(): boolean
    {
        if(this._lon >= 0) {
            return true;
        }
        
        return false;
    }

    public get isWesternHemisphere(): boolean
    {
        return !this.isEasternHemisphere;
    }

    public get declination(): number
    {
        return geomag.field(this._lat, this._lon).declination;
    }

    /**
     * This function formats the current position in the DMS format.
     * 
     * @example
     * const pos = new Position(50.02756868784301, 8.534261553454376);
     * const formatted = pos.toDMS();
     * // formatted = "50° 01′ 39.25″ N 008° 32′ 03.34″ E"
     * 
     * @returns The formatted coordinates
     */
    public toDMS() {
        const result = [];
        result.push(this.latDegreesAbs.toString().padStart(2, "0")+"°");
        result.push(Math.trunc(this.latMinutes).toString().padStart(2, "0")+"′");
        result.push(this.latSeconds.toFixed(2).toString().padStart(5, "0")+"″");
        result.push(this.latHemisphere);
        
        result.push(this.lonDegreesAbs.toString().padStart(3, "0")+"°");
        result.push(Math.trunc(this.lonMinutes).toString().padStart(2, "0")+"′");
        result.push(this.lonSeconds.toFixed(2).toString().padStart(5, "0")+"″");
        result.push(this.lonHemisphere);

        return result.join(" ");
    }

    /**
     * This function formats the current position in the DMS format but concatenated
     * which is useful mostly for fmc or software input.
     * 
     * @example
     * const pos = new Position(50.02756868784301, 8.534261553454376);
     * const formatted = pos.toDMSCode();
     * // formatted = "500139N0083203E"
     * 
     * @returns The formatted coordinates
     */
    public toDMSCode() {
        const result = [];
        result.push(this.latDegreesAbs.toString().padStart(2, "0"));
        result.push(Math.trunc(this.latMinutes).toString().padStart(2, "0"));
        result.push(Math.trunc(this.latSeconds).toString().padStart(2, "0"));
        result.push(this.latHemisphere);
        
        result.push(this.lonDegreesAbs.toString().padStart(3, "0"));
        result.push(Math.trunc(this.lonMinutes).toString().padStart(2, "0"));
        result.push(Math.trunc(this.lonSeconds).toString().padStart(2, "0"));
        result.push(this.lonHemisphere);

        return result.join("");
    }
    
    /**
     * This function formats the current position in the DMM format.
     * 
     * @example
     * const pos = new Position(50.02756868784301, 8.534261553454376);
     * const formatted = pos.toDMM();
     * // formatted = "50° 1.654′ N 008° 32.056′ E"
     * 
     * @returns The formatted coordinates
     */
    public toDMM() {
        const result = [];
        result.push(this.latDegreesAbs.toString().padStart(2, "0")+"°");
        result.push(this.latMinutes.toFixed(3).toString().padStart(2, "0")+"′");
        result.push(this.latHemisphere);
        
        result.push(this.lonDegreesAbs.toString().padStart(3, "0")+"°");
        result.push(this.lonMinutes.toFixed(3).toString().padStart(2, "0")+"′");
        result.push(this.lonHemisphere);

        return result.join(" ");
    }
    
    /**
     * This function formats the current position in the DDD format.
     * 
     * @example
     * const pos = new Position(50.02756868784301, 8.534261553454376);
     * const formatted = pos.toDMM();
     * // formatted = "50.0276° N 008.5343° E"
     * 
     * @returns The formatted coordinates
     */
    public toDDD() {
        const result = [];
        result.push(Math.abs(this.lat).toFixed(4).toString().padStart(7, "0")+"°");
        result.push(this.latHemisphere);
        
        result.push(Math.abs(this.lon).toFixed(4).toString().padStart(8, "0")+"°");
        result.push(this.lonHemisphere);

        return result.join(" ");
    }
}
