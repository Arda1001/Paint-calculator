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
            const obstacles = await this.inputHandler.getObstacles(i + 1);
            room.addWall(height, width, obstacles);
        }

        const totalArea = room.getTotalArea();
        const { brand, cans, cost, volumeNeeded } = this.brandHandler.getMostCostEfficientBrand(totalArea, numberOfCoats);

        // Set the paint coverage of the room based on the selected brand
        room.setPaintCoverage(brand.coveragePerLitre);

        console.log(`Total area to paint (for ${numberOfCoats} coats): ${totalArea} square metres`);
        console.log(`You will need approximately ${volumeNeeded.toFixed(2)} litres of paint.`);
        console.log(`Colour chosen: ${colour}`);
        console.log(`Most cost-efficient solution:`);
        console.log(`Brand: ${brand.name}`);
        console.log(`Number of cans: ${cans}`);
        console.log(`Total cost: £${cost.toFixed(2)}`);

        this.inputHandler.close();
    }
}

