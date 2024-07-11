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

