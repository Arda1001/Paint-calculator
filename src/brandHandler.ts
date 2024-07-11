import { PaintBrand } from './paintBrand';

export class BrandHandler {
    private brands: PaintBrand[];

    constructor() {
        this.brands = [
            new PaintBrand("Leyland", 1.60, 14, { litre: 1.60, twoPointFive: 4.00, five: 8.00, ten: 16.00 }),
            new PaintBrand("GoodHome", 5.60, 30, { litre: 5.60, twoPointFive: 14.00, five: 28.00, ten: 56.00 }),
            new PaintBrand("Dulux", 2.70, 13, { litre: 2.70, twoPointFive: 6.75, five: 13.50, ten: 27.00 })
        ];
    }

    public getBrands(): PaintBrand[] {
        return this.brands;
    }

    public getMostCostEfficientBrand(totalArea: number, numberOfCoats: number): { brand: PaintBrand, cans: number, cost: number, volumeNeeded: number } {
        let bestBrand = this.brands[0];
        let bestCost = Number.MAX_VALUE;
        let bestCans = 0;
        let bestVolumeNeeded = 0;

        for (let brand of this.brands) {
            const volumeNeeded = (totalArea * numberOfCoats) / brand.coveragePerLitre;
            const { cans, cost } = brand.calculateCost(volumeNeeded);
            if (cost < bestCost) {
                bestCost = cost;
                bestBrand = brand;
                bestCans = cans;
                bestVolumeNeeded = volumeNeeded;
            }
        }

        return { brand: bestBrand, cans: bestCans, cost: bestCost, volumeNeeded: bestVolumeNeeded };
    }
}
