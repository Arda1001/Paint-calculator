export class PaintBrand {
    public name: string;
    public pricePerLitre: number;
    public coveragePerLitre: number;
    public canSizes: { volume: number, price: number }[];

    constructor(name: string, pricePerLitre: number, coveragePerLitre: number, canPrices: { litre: number, twoPointFive: number, five: number, ten: number }) {
        this.name = name;
        this.pricePerLitre = pricePerLitre;
        this.coveragePerLitre = coveragePerLitre;
        this.canSizes = [
            { volume: 1, price: canPrices.litre },
            { volume: 2.5, price: canPrices.twoPointFive },
            { volume: 5, price: canPrices.five },
            { volume: 10, price: canPrices.ten }
        ];
    }

    public calculateCost(volumeNeeded: number): { cans: number, cost: number, canSizes: { volume: number, price: number }[] } {
        let totalCost = 0;
        let totalCans = 0;
        let remainingVolume = volumeNeeded;
        let usedCanSizes: { volume: number, price: number }[] = [];

        this.canSizes.sort((a, b) => b.volume - a.volume); // Sort cans by volume descending

        for (let can of this.canSizes) {
            while (remainingVolume >= can.volume) {
                remainingVolume -= can.volume;
                totalCost += can.price;
                totalCans++;
                usedCanSizes.push(can);
            }
        }

        if (remainingVolume > 0) {
            let smallestCan = this.canSizes[this.canSizes.length - 1];
            totalCost += smallestCan.price;
            totalCans++;
            usedCanSizes.push(smallestCan);
        }

        return { cans: totalCans, cost: totalCost, canSizes: usedCanSizes };
    }
}

// 1 litre: £2.00
// 2.5 litres: £4.00
// 5 litres: £8.00
// 10 litres: £16.00

// Example Calculation for 25 Litres:
// Initial Values:

// totalCost = 0
// totalCans = 0
// remainingVolume = 25

// Sorted Can Sizes:

// [10 litres, 5 litres, 2.5 litres, 1 litre]

// Using 10-Litre Cans:

// First 10-litre can:

// remainingVolume = 25 - 10 = 15
// totalCost = 0 + 16 = 16
// totalCans = 0 + 1 = 1
// Second 10-litre can:

// remainingVolume = 15 - 10 = 5
// totalCost = 16 + 16 = 32
// totalCans = 1 + 1 = 2

// Using 5-Litre Can:

// One 5-litre can:
// remainingVolume = 5 - 5 = 0
// totalCost = 32 + 8 = 40
// totalCans = 2 + 1 = 3

// Remaining Volume Check:

// remainingVolume = 0, so no need for an additional can.

// Final Result:

// totalCans = 3
// totalCost = 40
// usedCanSizes = [{ volume: 10, price: 16.00 }, { volume: 10, price: 16.00 }, { volume: 5, price: 8.00 }]
