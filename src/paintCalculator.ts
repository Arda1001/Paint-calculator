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

    // Main function to run the paint calculator
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
            console.log(`Brand: ${brand.name}, Coverage: ${brand.coveragePerLitre} m²/L, Price per litre: £${brand.pricePerLitre.toFixed(2)}`);
        });

        const chosenBrandName = await this.inputHandler.getBrandChoice(brands.map(brand => brand.name));
        const chosenBrand = brands.find(brand => brand.name.toLowerCase() === chosenBrandName.toLowerCase());

        if (!chosenBrand) {
            console.log("Error: Brand not found.");
            return;
        }

        const paintNeeded = totalArea / chosenBrand.coveragePerLitre;
        const { cans, cost, canSizes } = chosenBrand.calculateCost(paintNeeded);

        // Output the results
        console.log(`\nTotal area to paint (for ${numberOfCoats} coats): ${totalArea} square metres`);
        console.log(`You will need approximately ${paintNeeded.toFixed(2)} litres of paint.`);
        console.log(`Colour chosen: ${colour}`);
        console.log('Most cost-efficient solution for the chosen brand:');
        console.log(`Brand: ${chosenBrand.name}`);
        console.log(`Number of cans: ${cans}`);
        console.log(`Can sizes: ${canSizes.map(can => `${can.volume}L`).join(', ')}`);
        console.log(`Total cost: £${cost.toFixed(2)}`);

        this.inputHandler.close();
    }
}
