import { PositionParser } from "./index";

describe("test PositionParser class", () => {

    describe("testing the parse method", () => {
        test("normal positive values", () => {
            const result = PositionParser.parseDDD("40.123 74.123");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });
        
        test("wrong format", () => {
            expect(() => {
                PositionParser.parseDDD("40.123 U 74.123 V");
            }).toThrowError("Unexpected format");
        });
    });

    describe("testing the parseDDD method", () => {
        test("normal positive values", () => {
            const result = PositionParser.parseDDD("40.123 74.123");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values without decimals", () => {
            const result = PositionParser.parseDDD("40 74");
            expect(result.lat).toBe(40);
            expect(result.lon).toBe(74);
        });

        test("normal positive values with plus", () => {
            const result = PositionParser.parseDDD("+40.123, +74.123");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values with minus", () => {
            const result = PositionParser.parseDDD(" -40.123  ; -74.123 ");
            expect(result.lat).toBe(-40.123);
            expect(result.lon).toBe(-74.123);
        });

        test("normal positive values preceding hemisphere", () => {
            const result = PositionParser.parseDDD("N40.123E74.123");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values folling hemisphere", () => {
            const result = PositionParser.parseDDD("40.123 N 74.123 E");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values following hemisphere", () => {
            const result = PositionParser.parseDDD("40.123 S 74.123 W");
            expect(result.lat).toBe(-40.123);
            expect(result.lon).toBe(-74.123);
        });

        test("normal positive values mixed hemisphere", () => {
            const result = PositionParser.parseDDD("40.123 SW 74.123");
            expect(result.lat).toBe(-40.123);
            expect(result.lon).toBe(-74.123);
        });

        test("wrong format", () => {
            expect(() => {
                PositionParser.parseDDD("40.123 U 74.123 V");
            }).toThrowError("Unexpected format");
        });

        test("wrong format", () => {
            expect(() => {
                PositionParser.parseDDD("40.123 U 74.123 V");
            }).toThrowError("Unexpected format");
        });
    });
});