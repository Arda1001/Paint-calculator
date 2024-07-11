import * as readline from 'readline';

export class UserInputHandler {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    private validColours = ['red', 'blue', 'green', 'yellow', 'white', 'black'];

    askQuestion(query: string): Promise<string> {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    async getNumberOfWalls(): Promise<number> {
        while (true) {
            try {
                const input = await this.askQuestion("Enter the number of walls: ");
                const numberOfWalls = parseInt(input);
                if (isNaN(numberOfWalls) || numberOfWalls <= 0) {
                    console.log("You must have at least one wall to paint and it must be a valid number.");
                    continue;
                }
                return numberOfWalls;
            }
            catch {
                console.log("Invalid input. Please enter a positive integer.");
            }
        }
    }

    async getNumberOfCoats(): Promise<number> {
        while (true) {
            try {
                const input = await this.askQuestion("Enter the number of coats: ");
                const numberOfCoats = parseInt(input);
                if (isNaN(numberOfCoats) || numberOfCoats <= 0) {
                    console.log("Must have at least one coat of paint and it must be a valid number.");
                    continue;
                }
                return numberOfCoats;
            }
            catch {
                console.log("Invalid input. Please enter a positive integer.");
            }
        }
    }

    async getColour(): Promise<string> {
        while (true) {
            try {
                const input = (await this.askQuestion(`Enter the colour of the paint (${this.validColours.join(', ')}): `)).toLowerCase();
                if (!this.validColours.includes(input)) {
                    console.log(`Invalid colour. Please choose from the following: ${this.validColours.join(', ')}`);
                    continue;
                }
                return input;
            }
            catch {
                console.log("Invalid input. Please enter a valid colour.");
            }
        }
    }

    // Get the dimensions of the wall
    async getWallDimensions(wallIndex: number): Promise<{ height: number, width: number }> {
        let height = 0;
        let width = 0;

        while (true) {
            try {
                const input = await this.askQuestion(`Enter the height of wall ${wallIndex} (in metres): `);
                height = parseFloat(input);
                if (isNaN(height) || height <= 0) {
                    console.log("Height must be a positive number.");
                    continue;
                }
                break;
            }
            catch {
                console.log("Invalid input. Please enter a positive number.");
            }
        }

        while (true) {
            try {
                const input = await this.askQuestion(`Enter the width of wall ${wallIndex} (in metres): `);
                width = parseFloat(input);
                if (isNaN(width) || width <= 0) {
                    console.log("Width must be a positive number.");
                    continue;
                }
                break;
            }
            catch {
                console.log("Invalid input. Please enter a positive number.");
            }
        }

        return { height, width };
    }

    // Get the dimensions of any obstacles on the wall
    async getObstacles(wallIndex: number, wallHeight: number, wallWidth: number): Promise<{ height: number, width: number }[]> {
        let obstacles: { height: number, width: number }[] = [];
        const wallArea = wallHeight * wallWidth;
        let remainingArea = wallArea;

        let hasObstacles: string;
        while (true) {
            hasObstacles = (await this.askQuestion(`Does wall ${wallIndex} have obstacles (yes/no)? `)).toLowerCase();
            if (hasObstacles === 'yes' || hasObstacles === 'no') {
                break;
            }
            else {
                console.log("Invalid input. Please enter 'yes' or 'no'.");
            }
        }

        // If there are no obstacles, return an empty array
        if (hasObstacles === 'yes') {
            while (true) {
                try {
                    const input = await this.askQuestion("Enter the number of obstacles: ");
                    const numberOfObstacles = parseInt(input);
                    if (isNaN(numberOfObstacles) || numberOfObstacles <= 0) {
                        console.log("Number of obstacles must be a valid positive integer.");
                        continue;
                    }

                    for (let j = 0; j < numberOfObstacles; j++) {
                        let obstacleHeight = 0;
                        let obstacleWidth = 0;
                        let obstacleArea = 0;

                        while (true) {
                            try {
                                const input = await this.askQuestion(`Enter the height of obstacle ${j + 1} (in metres): `);
                                obstacleHeight = parseFloat(input);
                                if (isNaN(obstacleHeight) || obstacleHeight <= 0 || obstacleHeight > wallHeight) {
                                    console.log("Obstacle height must be a positive number and less than or equal to the wall height.");
                                    continue;
                                }
                                break;
                            }
                            catch {
                                console.log("Invalid input. Please enter a positive number.");
                            }
                        }

                        while (true) {
                            try {
                                const input = await this.askQuestion(`Enter the width of obstacle ${j + 1} (in metres): `);
                                obstacleWidth = parseFloat(input);
                                if (isNaN(obstacleWidth) || obstacleWidth <= 0 || obstacleWidth > wallWidth) {
                                    console.log("Obstacle width must be a positive number and less than or equal to the wall width.");
                                    continue;
                                }
                                break;
                            }
                            catch {
                                console.log("Invalid input. Please enter a positive number.");
                            }
                        }

                        obstacleArea = obstacleHeight * obstacleWidth;

                        if (obstacleArea > remainingArea) {
                            console.log("Obstacle area exceeds the remaining wall area. Please re-enter the obstacle dimensions.");
                            j--; // Decrement j to repeat the input for this obstacle
                            continue;
                        }

                        remainingArea -= obstacleArea;
                        obstacles.push({ height: obstacleHeight, width: obstacleWidth });
                    }
                    break;
                }
                catch {
                    console.log("Invalid input. Please enter a positive number.");
                }
            }
        }

        return obstacles;
    }

    async getBrandChoice(brands: string[]): Promise<string> {
        const lowerCaseBrands = brands.map(brand => brand.toLowerCase());
        while (true) {
            try {
                const input = (await this.askQuestion(`Choose a brand (${brands.join(', ')}): `)).toLowerCase();
                if (!lowerCaseBrands.includes(input)) {
                    console.log(`Invalid brand. Please choose from the following: ${brands.join(', ')}`);
                    continue;
                }
                return brands[lowerCaseBrands.indexOf(input)];
            }
            catch {
                console.log("Invalid input. Please choose a valid brand.");
            }
        }
    }

    // Close the readline interface
    close(): void {
        this.rl.close();
    }
}

