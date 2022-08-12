import { Position, getDistance } from "./index";

describe("getDistance", () => {
    test("works for north-eastern part", () => {
        const pos1 = new Position(50.02756868784301, 8.534261553454376);
        const pos2 = new Position(50.04004266904205, 8.586451452554849);
        const result = getDistance(pos1, pos2);
        expect(result).toBe(2.149991944029959);
    });

    test("works for north- and south-eastern part", () => {
        const pos1 = new Position(34.44207377593099, 108.76076803574009);
        const pos2 = new Position(-31.940530363329806, 115.96498033889004);
        const result = getDistance(pos1, pos2);
        expect(result).toBe(4010.8461722019983);
    });

    test("works for frankfurt to new york", () => {
        const pos1 = new Position(50.0379326, 8.5599631);
        const pos2 = new Position(40.6413113, -73.780327);
        const result = getDistance(pos1, pos2);
        expect(result).toBe(3345.2785752773593);
    });
});
