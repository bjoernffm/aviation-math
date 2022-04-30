import { Position } from "./position";

export class PositionParser
{
    public static parse(latlon: string) : Position
    {
        let pos = null;

        try {
            pos = PositionParser.parseDDD(latlon);
        } catch(e) {
            // disregard and check next format
        }

        if(pos === null) {
            throw new Error("Unexpected format");
        }

        return pos;
    }

    public static parseDDD(latlon: string) : Position
    {
        const regex = /^([ns])?[^+-\d\w]*([+-])?(\d+\.?\d*)[^+-\d\w]*([ns])?[^+-\d\w]*([ew])?[^+-\d\w]*([+-])?(\d+\.?\d*)[^+-\d\w]*([ew])?$/i;
        const result = latlon.trim().match(regex);

        let lat: number;
        let lon: number;

        if(result === null) {
            throw new Error("Unexpected format");
        }

        if(result[1] == "S" || result[2] == "-" || result[4] == "S") {
            lat = -1*parseFloat(result[3]);
        } else {
            lat = parseFloat(result[3]);
        }

        if(result[5] == "W" || result[6] == "-" || result[8] == "W") {
            lon = -1*parseFloat(result[7]);
        } else {
            lon = parseFloat(result[7]);
        }

        return new Position(lat, lon);
    }
}