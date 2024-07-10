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
                if (numberOfWalls <= 0) {
                    console.log("You must have at least one wall to paint.");
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
                if (numberOfCoats <= 0) {
                    console.log("Must have at least one coat of paint.");
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

    async getWallDimensions(wallIndex: number): Promise<{ height: number, width: number }> {
        let height = 0;
        let width = 0;

        while (true) {
            try {
                const input = await this.askQuestion(`Enter the height of wall ${wallIndex} (in metres): `);
                height = parseFloat(input);
                if (height <= 0) {
                    console.log("Height must be positive.");
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
                if (width <= 0) {
                    console.log("Width must be positive.");
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

    async getObstacles(wallIndex: number): Promise<{ height: number, width: number }[]> {
        let obstacles: { height: number, width: number }[] = [];
        const wallDimensions = await this.getWallDimensions(wallIndex);
        const wallArea = wallDimensions.height * wallDimensions.width;
        let remainingArea = wallArea;

        const hasObstacles = await this.askQuestion(`Does wall ${wallIndex} have obstacles (yes/no)? `);

        if (hasObstacles.toLowerCase() === 'yes') {
            const numberOfObstacles = parseInt(await this.askQuestion("Enter the number of obstacles: "));

            for (let j = 0; j < numberOfObstacles; j++) {
                let obstacleHeight = 0;
                let obstacleWidth = 0;
                let obstacleArea = 0;

                while (true) {
                    try {
                        obstacleHeight = parseFloat(await this.askQuestion(`Enter the height of obstacle ${j + 1} (in metres): `));
                        if (obstacleHeight <= 0 || obstacleHeight > wallDimensions.height) {
                            console.log("Obstacle height must be positive and less than or equal to the wall height.");
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
                        obstacleWidth = parseFloat(await this.askQuestion(`Enter the width of obstacle ${j + 1} (in metres): `));
                        if (obstacleWidth <= 0 || obstacleWidth > wallDimensions.width) {
                            console.log("Obstacle width must be positive and less than or equal to the wall width.");
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
                    continue;
                }

                remainingArea -= obstacleArea;
                obstacles.push({ height: obstacleHeight, width: obstacleWidth });
            }
        }

        return obstacles;
    }

    close(): void {
        this.rl.close();
    }
}
