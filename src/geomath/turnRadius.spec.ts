import { turnRadius } from './turnRadius';

describe('turnRadius', () => {
    test('works for beechcraft bonanza', () => {
        expect(turnRadius(160, 30)).toBeCloseTo(0.645);
    });

    test('works for airliners', () => {
        expect(turnRadius(450, 30)).toBeCloseTo(5.14);
    });
});
