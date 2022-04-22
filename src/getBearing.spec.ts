import { Position } from './position';
import { getBearing } from './getBearing';

describe('bearingTo', () => {
    it('should return a bearing between two points', () => {
        let result;

        result = getBearing(
            new Position(39.778889, -104.9825),
            new Position(43.778889, -102.9825),
        );
        expect(result).toBe(19.787524850709246);

        result = getBearing(
            new Position(51.5104, 7.3256),
            new Position(43.778889, 7.491),
        );
        expect(result).toBe(179.11237166124715);
    });
});
