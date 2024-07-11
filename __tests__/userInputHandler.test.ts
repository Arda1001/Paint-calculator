import { UserInputHandler } from '../src/userInputHandler';

jest.mock('readline');

describe('UserInputHandler', () => {
    it('should get number of walls', async () => {
        const mockRl = {
            question: jest.fn().mockImplementation((query, callback) => {
                callback('3');
            }),
            close: jest.fn(),
        };
        require('readline').createInterface.mockReturnValue(mockRl);

        const inputHandler = new UserInputHandler();
        const numberOfWalls = await inputHandler.getNumberOfWalls();

        expect(numberOfWalls).toBe(3);
    });
});
