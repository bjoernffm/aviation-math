import { PositionParser } from "./index";

/* eslint-disable max-lines-per-function */
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

    describe("testing the parseDMM method", () => {
        test("normal positive values with ° and ' symbols", () => {
            const result = PositionParser.parseDMM("40° 7.38' 74° 7.38'");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values without ° and ' symbols", () => {
            const result = PositionParser.parseDMM("40 7.38 74 7.38");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive without comma", () => {
            const result = PositionParser.parseDMM("40 7 74 7");
            expect(result.lat).toBeCloseTo(40.117);
            expect(result.lon).toBeCloseTo(74.117);
        });

        test("normal positive values with plus", () => {
            const result = PositionParser.parseDMM("+40 7.38, +74 7.38");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values with minus", () => {
            const result = PositionParser.parseDMM(" -40 7.38  ; -74 7.38 ");
            expect(result.lat).toBe(-40.123);
            expect(result.lon).toBe(-74.123);
        });

        test("normal positive values preceding hemisphere", () => {
            const result = PositionParser.parseDMM("N40 7.38 E74 7.38");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values folling hemisphere", () => {
            const result = PositionParser.parseDMM("40 7.38 N 74 7.38 E");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("normal positive values following hemisphere", () => {
            const result = PositionParser.parseDMM("40 7.38S 74 7.38W");
            expect(result.lat).toBe(-40.123);
            expect(result.lon).toBe(-74.123);
        });

        test("normal positive values mixed hemisphere", () => {
            const result = PositionParser.parseDMM("40 7.38 SW 74 7.38");
            expect(result.lat).toBe(-40.123);
            expect(result.lon).toBe(-74.123);
        });

        test("wrong format", () => {
            expect(() => {
                PositionParser.parseDMM("40 7.38 U 74 7.38 V");
            }).toThrowError("Unexpected format");
        });

        test("wrong format", () => {
            expect(() => {
                PositionParser.parseDMM("40.123 U 74.123 V");
            }).toThrowError("Unexpected format");
        });
    });
});
