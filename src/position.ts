// see http://www.c-dev.ch/2012/10/26/koordinatenformate/ for formatting

export class Position {
    private _lat: number;
    private _lon: number;

    public constructor(lat: number, lon: number)
    {
        this._lat = lat;
        this._lon = lon;
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
        if(this.isNorthernHemisphere()) {
            return "N"
        }
        
        return "S";
    }

    public get lonHemisphere(): string
    {
        if(this.isEasternHemisphere()) {
            return "E"
        }
        
        return "W";
    }

    public isNorthernHemisphere(): boolean
    {
        if(this._lat >= 0) {
            return true;
        }
        
        return false;
    }

    public isSouthernHemisphere(): boolean
    {
        return !this.isNorthernHemisphere();
    }

    public isEasternHemisphere(): boolean
    {
        if(this._lon >= 0) {
            return true;
        }
        
        return false;
    }

    public isWesternHemisphere(): boolean
    {
        return !this.isEasternHemisphere();
    }

    public toDMS() {
        const result = [];
        result.push(this.latDegreesAbs.toString().padStart(2, '0')+"°");
        result.push(Math.trunc(this.latMinutes).toString().padStart(2, '0')+"′");
        result.push(this.latSeconds.toFixed(2).toString().padStart(5, '0')+"″");
        result.push(this.latHemisphere);
        
        result.push(this.lonDegreesAbs.toString().padStart(3, '0')+"°");
        result.push(Math.trunc(this.lonMinutes).toString().padStart(2, '0')+"′");
        result.push(this.lonSeconds.toFixed(2).toString().padStart(5, '0')+"″");
        result.push(this.lonHemisphere);

        return result.join(" ");
    }

    public toDMSCode() {
        const result = [];
        result.push(this.latDegreesAbs.toString().padStart(2, '0'));
        result.push(Math.trunc(this.latMinutes).toString().padStart(2, '0'));
        result.push(Math.trunc(this.latSeconds).toString().padStart(2, '0'));
        result.push(this.latHemisphere);
        
        result.push(this.lonDegreesAbs.toString().padStart(3, '0'));
        result.push(Math.trunc(this.lonMinutes).toString().padStart(2, '0'));
        result.push(Math.trunc(this.lonSeconds).toString().padStart(2, '0'));
        result.push(this.lonHemisphere);

        return result.join("");
    }
    
    public toDMM() {
        const result = [];
        result.push(this.latDegreesAbs.toString().padStart(2, '0')+"°");
        result.push(this.latMinutes.toFixed(3).toString().padStart(2, '0')+"′");
        result.push(this.latHemisphere);
        
        result.push(this.lonDegreesAbs.toString().padStart(3, '0')+"°");
        result.push(this.lonMinutes.toFixed(3).toString().padStart(2, '0')+"′");
        result.push(this.lonHemisphere);

        return result.join(" ");
    }
    
    public toDDD() {
        const result = [];
        result.push(Math.abs(this.lat).toFixed(4).toString().padStart(7, '0')+"°");
        result.push(this.latHemisphere);
        
        result.push(Math.abs(this.lon).toFixed(4).toString().padStart(8, '0')+"°");
        result.push(this.lonHemisphere);

        return result.join(" ");
    }
}
