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