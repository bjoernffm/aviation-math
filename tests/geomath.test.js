const { GeoMath, Position } = require('../dist/geomath');

describe('distance', () => {
    test('works for north-eastern part', () => {
        let pos1 = new Position(50.02756868784301, 8.534261553454376);
        let pos2 = new Position(50.04004266904205, 8.586451452554849);
        let result = GeoMath.distance(pos1, pos2);
        expect(result).toBe(2.149991944029959);
    });

    test('works for north- and south-eastern part', () => {
        let pos1 = new Position(34.44207377593099, 108.76076803574009);
        let pos2 = new Position(-31.940530363329806, 115.96498033889004);
        let result = GeoMath.distance(pos1, pos2);
        expect(result).toBe(4010.8461722019983);
    });

    test('works for frankfurt to new york', () => {
        let pos1 = new Position(50.0379326, 8.5599631);
        let pos2 = new Position(40.6413113,-73.780327);
        let result = GeoMath.distance(pos1, pos2);
        expect(result).toBe(3345.2785752773593);
    });
});

describe('placeBearingDistance', () => {
    test('should get the destination point to a given point, distance and bearing', () => {
        let result;

        result = GeoMath.placeBearingDistance(
            new Position(52.518611, 13.408056),
            180,
            8.09935205184,
        );
        expect(result.lat).toBe(52.383863707381906);
        expect(result.lon).toBe(13.408056);

        
        result = GeoMath.placeBearingDistance(
            new Position(52.518611, 13.408056),
            135,
            8.09935205184,
        );
        expect(result.lat).toBe(52.4232272267234);
        expect(result.lon).toBe(13.564299057246314);
    });

    test('should not exceed maxLon or fall below minLon', () => {
        let result = GeoMath.placeBearingDistance(
            new Position(18.5075232, 73.8047121),
            0,
            26997.8401728,
        );
        expect(result.lat).toBe(72.33483473966008);
        expect(result.lon).toBe(-106.19528790000004);
    });

    it('should leave long untouched if bearing is 0 or 180', () => {
        let result;

        result = GeoMath.placeBearingDistance(
            new Position(18.5075232, 73.8047121),
            0,
            0.26997840172,
        );
        expect(result.lat).toBe(18.512014776420475);
        expect(result.lon).toBe(73.8047121);

        result = GeoMath.placeBearingDistance(
            new Position(18.5075232, 73.8047121),
            180,
            0.26997840172,
        );
        expect(result.lat).toBe(18.50303162357953);
        expect(result.lon).toBe(73.8047121);
    });

    test('should return a bearing between two points', () => {
        let result;

        result = GeoMath.bearingTo(
            new Position(39.778889, -104.9825),
            new Position(43.778889, -102.9825),
        );
        expect(result).toBe(19.787524850709246);

        result = GeoMath.bearingTo(
            new Position(51.5104, 7.3256),
            new Position(43.778889, 7.491),
        );
        expect(result).toBe(179.11237166124715);
    });
});