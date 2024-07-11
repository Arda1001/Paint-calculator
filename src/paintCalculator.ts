import { Room } from './room';
import { UserInputHandler } from './userInputHandler';
import { BrandHandler } from './brandHandler';

export class PaintCalculator {
    private inputHandler: UserInputHandler;
    private brandHandler: BrandHandler;

    constructor() {
        this.inputHandler = new UserInputHandler();
        this.brandHandler = new BrandHandler();
    }

    public async run(): Promise<void> {
        console.log("Welcome to the Paint Calculator!");

        const numberOfWalls = await this.inputHandler.getNumberOfWalls();
        const numberOfCoats = await this.inputHandler.getNumberOfCoats();
        const colour = await this.inputHandler.getColour();
        const room = new Room(numberOfCoats, colour);

        for (let i = 0; i < numberOfWalls; i++) {
            const { height, width } = await this.inputHandler.getWallDimensions(i + 1);
            const obstacles = await this.inputHandler.getObstacles(i + 1, height, width);
            room.addWall(height, width, obstacles);
        }

        const totalArea = room.getTotalArea();
        const brands = this.brandHandler.getBrands();

        console.log("Available brands and their details:");
        brands.forEach(brand => {
            console.log(`Brand: ${brand.name}, Coverage: ${brand.coveragePerLitre} m²/L, Prices: 1L - £${brand.canSizes.find(size => size.volume === 1)?.price}, 2.5L - £${brand.canSizes.find(size => size.volume === 2.5)?.price}, 5L - £${brand.canSizes.find(size => size.volume === 5)?.price}, 10L - £${brand.canSizes.find(size => size.volume === 10)?.price}`);
        });

        let minCost = Infinity;
        let bestBrand = '';
        let bestNumberOfCans = 0;
        let bestCanSizes: { volume: number, price: number }[] = [];

        for (const brand of brands) {
            const paintNeeded = totalArea / brand.coveragePerLitre;
            const { cans, cost, canSizes } = brand.calculateCost(paintNeeded);

            if (cost < minCost) {
                minCost = cost;
                bestBrand = brand.name;
                bestNumberOfCans = cans;
                bestCanSizes = canSizes;
            }
        }

        console.log(`\nTotal area to paint (for ${numberOfCoats} coats): ${totalArea} square metres`);
        console.log(`You will need approximately ${(totalArea / brands[0].coveragePerLitre).toFixed(2)} litres of paint.`);
        console.log(`Colour chosen: ${colour}`);
        console.log('Most cost-efficient solution:');
        console.log(`Brand: ${bestBrand}`);
        console.log(`Number of cans: ${bestNumberOfCans}`);
        console.log(`Can sizes: ${bestCanSizes.map(can => `${can.volume}L`).join(', ')}`);
        console.log(`Total cost: £${minCost.toFixed(2)}`);

        this.inputHandler.close();
    }
}


