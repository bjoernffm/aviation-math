import { Position } from "./position";

export class PositionParser
{
    public static parse(latlon: string) : Position
    {
        let pos = null;

        try {
            pos = PositionParser.parseDMSSCode(latlon);
        } catch {
            try {
                pos = PositionParser.parseDDD(latlon);
            } catch {
                try {
                    pos = PositionParser.parseDMM(latlon);
                } catch {
                    // disregard and check next format
                }
            }
        }

        if (pos === null) {
            throw new Error("Unexpected format");
        }

        return pos;
    }

    // eg. 40.123 N 74.123 E
    public static parseDDD(latlon: string) : Position
    {
        const regex = /^([ns])?[^+-\d\w]*([+-])?(\d+\.?\d*)[^+-\d\w]*([ns])?[^+-\d\w]*([ew])?[^+-\d\w]*([+-])?(\d+\.?\d*)[^+-\d\w]*([ew])?$/i;
        const result = latlon.trim().match(regex);

        let lat: number;
        let lon: number;

        if (result === null) {
            throw new Error("Unexpected format");
        }

        lat = parseFloat(result[3]);
        if (result[1] == "S" || result[2] == "-" || result[4] == "S") {
            lat *= -1;
        }

        lon = parseFloat(result[7]);
        if (result[5] == "W" || result[6] == "-" || result[8] == "W") {
            lon *= -1;
        }

        return new Position(lat, lon);
    }

    // eg. 40 7.38 N 74 7.38 E
    public static parseDMM(latlon: string) : Position
    {
        const regex = /^([ns])?[^+-\d\w]*([+-])?(\d+)[^\d\w]*(\d+\.?\d*)[^+-\d\w]*([ns])?[^+-\d\w]*([ew])?[^+-\d\w]*([+-])?(\d+)[^\d\w]*(\d+\.?\d*)[^+\-\d\w]*([ew])?$/i;
        const result = latlon.trim().match(regex);

        let lat: number;
        let lon: number;

        if (result === null) {
            throw new Error("Unexpected format");
        }

        lat = parseFloat(result[3]);
        lat += (parseFloat(result[4])/60);
        if (result[1] == "S" || result[2] == "-" || result[5] == "S") {
            lat *= -1;
        }

        lon = parseFloat(result[8]);
        lon += (parseFloat(result[9])/60);
        if (result[6] == "W" || result[7] == "-" || result[10] == "W") {
            lon *= -1;
        }

        return new Position(lat, lon);
    }

    // eg. N50020301 E008313335
    /* eslint max-lines-per-function: ["error", { "max": 36 }] */
    public static parseDMSSCode(latlon: string) : Position
    {
        const regex = /^([ns])?(\d{2})(\d{2})(\d{2})(\d{2})?([ns])?\W*([ew])?(\d{3})(\d{2})(\d{2})(\d{2})?([ew])?$/i;
        const result = latlon.trim().match(regex);

        let lat: number;
        let lon: number;

        if (result === null) {
            throw new Error("Unexpected format");
        }

        lat = parseInt(result[2]);
        lat += (parseInt(result[3])/60);
        if (result[5] !== undefined) {
            lat += (parseFloat(`${result[4]}.${result[5]}`)/(60*60));
        } else {
            lat += (parseFloat(result[4])/(60*60));
        }
        if (result[1] == "S" || result[6] == "S") {
            lat *= -1;
        }

        lon = parseInt(result[8]);
        lon += (parseInt(result[9])/60);
        if (result[11] !== undefined) {
            lon += (parseFloat(`${result[10]}.${result[11]}`)/(60*60));
        } else {
            lon += (parseFloat(result[10])/(60*60));
        }
        if (result[7] == "W" || result[12] == "W") {
            lon *= -1;
        }

        return new Position(lat, lon);
    }
}
