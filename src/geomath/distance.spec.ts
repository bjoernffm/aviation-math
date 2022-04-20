import { Position } from '../position';
import { distance } from './distance';

describe('distance', () => {
    test('works for north-eastern part', () => {
        let pos1 = new Position(50.02756868784301, 8.534261553454376);
        let pos2 = new Position(50.04004266904205, 8.586451452554849);
        let result = distance(pos1, pos2);
        expect(result).toBe(2.149991944029959);
    });

    test('works for north- and south-eastern part', () => {
        let pos1 = new Position(34.44207377593099, 108.76076803574009);
        let pos2 = new Position(-31.940530363329806, 115.96498033889004);
        let result = distance(pos1, pos2);
        expect(result).toBe(4010.8461722019983);
    });

    test('works for frankfurt to new york', () => {
        let pos1 = new Position(50.0379326, 8.5599631);
        let pos2 = new Position(40.6413113,-73.780327);
        let result = distance(pos1, pos2);
        expect(result).toBe(3345.2785752773593);
    });
});
