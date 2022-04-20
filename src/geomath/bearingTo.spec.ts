import { Position } from '../position';
import { bearingTo } from './bearingTo';

describe('bearingTo', () => {
    it('should return a bearing between two points', () => {
        let result;

        result = bearingTo(
            new Position(39.778889, -104.9825),
            new Position(43.778889, -102.9825),
        );
        expect(result).toBe(19.787524850709246);

        result = bearingTo(
            new Position(51.5104, 7.3256),
            new Position(43.778889, 7.491),
        );
        expect(result).toBe(179.11237166124715);
    });
});
