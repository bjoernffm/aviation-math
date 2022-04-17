import { Position } from './position';

describe('Position', () => {
    test('attributes are correctly set', () => {
        let pos = new Position(55.1, -20.77);
        expect(pos.lat).toBe(55.1);
        expect(pos.lon).toBe(-20.77);
    });
});