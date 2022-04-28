import { Position } from "./position";

describe("Position attributes", () => {
    test("attributes are correctly set", () => {
        const pos = new Position(55.1, -20.77);
        expect(pos.lat).toBe(55.1);
        expect(pos.lon).toBe(-20.77);
    });

    test("latDegrees", () => {
        let pos;
        pos = new Position(55.12, -20.77);
        expect(pos.latDegrees).toBe(55);
        pos = new Position(55.92, -20.77);
        expect(pos.latDegrees).toBe(55);
        pos = new Position(-55.92, -20.77);
        expect(pos.latDegrees).toBe(-55);
        pos = new Position(-55.12, -20.77);
        expect(pos.latDegrees).toBe(-55);
    });

    test("latDegrees", () => {
        let pos;
        pos = new Position(55.12, 20.77);
        expect(pos.lonDegrees).toBe(20);
        pos = new Position(55.12, 20.27);
        expect(pos.lonDegrees).toBe(20);
        pos = new Position(55.12, -20.77);
        expect(pos.lonDegrees).toBe(-20);
        pos = new Position(55.12, -20.27);
        expect(pos.lonDegrees).toBe(-20);
    });

    test("latDegreesAbs", () => {
        let pos;
        pos = new Position(55.12, 20.77);
        expect(pos.latDegreesAbs).toBe(55);
        pos = new Position(-55.12, 20.77);
        expect(pos.latDegreesAbs).toBe(55);
        pos = new Position(0, 20.77);
        expect(pos.latDegreesAbs).toBe(0);
    });

    test("lonDegreesAbs", () => {
        let pos;
        pos = new Position(55.12, 20.77);
        expect(pos.lonDegreesAbs).toBe(20);
        pos = new Position(55.12, -20.77);
        expect(pos.lonDegreesAbs).toBe(20);
        pos = new Position(55.12, 0);
        expect(pos.lonDegreesAbs).toBe(0);
    });
});

describe("Position to-functions", () => {
    test("to DMS", () => {
        const pos = new Position(50.02756868784301, 8.534261553454376);
        expect(pos.toDMS()).toBe("50° 01′ 39.25″ N 008° 32′ 03.34″ E");
    });

    test("to toDMSCode", () => {
        const pos = new Position(50.02756868784301, 8.534261553454376);
        expect(pos.toDMSCode()).toBe("500139N0083203E");
    });

    test("to toDMM", () => {
        const pos = new Position(50.02756868784301, 8.534261553454376);
        expect(pos.toDMM()).toBe("50° 1.654′ N 008° 32.056′ E");
    });

    test("to toDDD", () => {
        const pos = new Position(50.02756868784301, 8.534261553454376);
        expect(pos.toDDD()).toBe("50.0276° N 008.5343° E");
    });
});
