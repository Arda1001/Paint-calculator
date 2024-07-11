import { PaintBrand } from '../src/paintBrand';

describe('PaintBrand', () => {
    it('should calculate the correct cost and number of cans', () => {
        const brand = new PaintBrand('TestBrand', 2.0, 10, {
            litre: 2.0,
            twoPointFive: 4.0,
            five: 8.0,
            ten: 16.0,
        });

        const { cans, cost, canSizes } = brand.calculateCost(25);

        // Explanation:
        // 2 * 10 litres = 20 litres (cost 2 * £16 = £32)
        // 1 * 5 litres = 5 litres (cost 1 * £8 = £8)
        // Total: 3 cans, total cost = £40

        expect(cans).toBe(3);
        expect(cost).toBe(40);
        expect(canSizes).toEqual([
            { volume: 10, price: 16.0 },
            { volume: 10, price: 16.0 },
            { volume: 5, price: 8.0 },
        ]);
    });
});
