import { TurnDirection } from '../common';
import { Position } from '../position';
import { projectTurnPosition } from './projectTurnPosition';

describe('placeBearingDistance', () => {
    test('should get the destination point to a given point, distance and bearing', () => {
        let position = new Position(50.0379326, 8.5599631);
        let result = projectTurnPosition(position, 270, 90, 4, TurnDirection.LEFT);
        expect(result.lat).toBe(49.90483820750475)
        expect(result.lon).toBe(8.5599631)
    });
});
