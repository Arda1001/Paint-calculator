import { Room } from '../src/room';

describe('Room', () => {
    it('should calculate the correct total area', () => {
        const room = new Room(2, 'red');
        room.addWall(3, 4, []);
        room.addWall(2, 5, []);

        expect(room.getTotalArea()).toBe(44); // (3*4 + 2*5) * 2 coats
    });

    it('should calculate the correct paint needed', () => {
        const room = new Room(2, 'red');
        room.addWall(3, 4, []);
        room.addWall(2, 5, []);
        room.setPaintCoverage(10);

        expect(room.getPaintNeeded()).toBe(4.4); // 34 / 10
    });
});
