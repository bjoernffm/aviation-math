import { Position } from "./position";
import { projectBearingDistance } from "./projectBearingDistance";

describe("placeBearingDistance", () => {
    test("should get the destination point to a given point, distance and bearing", () => {
        let result;

        result = projectBearingDistance(
            new Position(52.518611, 13.408056),
            180,
            8.09935205184,
        );
        expect(result.lat).toBe(52.383863707381906);
        expect(result.lon).toBe(13.408056);

        
        result = projectBearingDistance(
            new Position(52.518611, 13.408056),
            135,
            8.09935205184,
        );
        expect(result.lat).toBe(52.4232272267234);
        expect(result.lon).toBe(13.564299057246314);
    });

    test("should not exceed maxLon or fall below minLon", () => {
        const result = projectBearingDistance(
            new Position(18.5075232, 73.8047121),
            0,
            26997.8401728,
        );
        expect(result.lat).toBe(72.33483473966008);
        expect(result.lon).toBe(-106.19528790000004);
    });

    it("should leave long untouched if bearing is 0 or 180", () => {
        let result;

        result = projectBearingDistance(
            new Position(18.5075232, 73.8047121),
            0,
            0.26997840172,
        );
        expect(result.lat).toBe(18.512014776420475);
        expect(result.lon).toBe(73.8047121);

        result = projectBearingDistance(
            new Position(18.5075232, 73.8047121),
            180,
            0.26997840172,
        );
        expect(result.lat).toBe(18.50303162357953);
        expect(result.lon).toBe(73.8047121);
    });
});
