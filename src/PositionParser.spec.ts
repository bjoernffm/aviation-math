import { PositionParser } from "./index";

/* eslint-disable max-lines-per-function */
describe("test PositionParser class", () => {

    describe("check if parse methods are correctly integrated", () => {
        test("parseDDD method integrated", () => {
            const result = PositionParser.parse("40.123 74.123");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("parseDMM method integrated", () => {
            const result = PositionParser.parse("40 7.38 N 74 7.38 E");
            expect(result.lat).toBe(40.123);
            expect(result.lon).toBe(74.123);
        });

        test("parseDMSSCode method integrated", () => {
            const result = PositionParser.parse("N50020301,E008313335");
            expect(result.lat).toBeCloseTo(50.0341694, 7);
            expect(result.lon).toBeCloseTo(8.5259306, 7);
        });
    });

    describe("testing the parse method", () => {
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

        test("normal positive values mixed hemisphere", () => {
            const result = PositionParser.parseDMM("40 07.38 SW 074 07.38");
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

    describe("testing the parseDMSSCode method", () => {
        test("normal northeast values with comma", () => {
            const result = PositionParser.parseDMSSCode("N50020301,E008313335");
            expect(result.lat).toBeCloseTo(50.0341694, 7);
            expect(result.lon).toBeCloseTo(8.5259306, 7);
        });

        test("normal northwest values with space", () => {
            const result = PositionParser.parseDMSSCode("N76314803 W068454141");
            expect(result.lat).toBeCloseTo(76.5300083, 7);
            expect(result.lon).toBeCloseTo(-68.7615028, 7);
        });

        test("normal southwest values without space", () => {
            const result = PositionParser.parseDMSSCode("S22545948W043094478");
            expect(result.lat).toBeCloseTo(-22.9165222, 7);
            expect(result.lon).toBeCloseTo(-43.1624389, 7);
        });

        test("normal southeast values without space", () => {
            const result = PositionParser.parseDMSSCode("S08300132-E151043312");
            expect(result.lat).toBeCloseTo(-8.5003667, 7);
            expect(result.lon).toBeCloseTo(151.0758667, 7);
        });

        test("Difficult formatting", () => {
            const result = PositionParser.parseDMSSCode("08300132SE151043312");
            expect(result.lat).toBeCloseTo(-8.5003667, 7);
            expect(result.lon).toBeCloseTo(151.0758667, 7);
        });

        test("Difficult formatting", () => {
            const result = PositionParser.parseDMSSCode("083001SE1510433");
            expect(result.lat).toBeCloseTo(-8.491, 2);
            expect(result.lon).toBeCloseTo(151.066, 2);
        });

        test("wrong format", () => {
            expect(() => {
                PositionParser.parseDMSSCode("S083001E15104312");
            }).toThrowError("Unexpected format");
        });
    });
});
