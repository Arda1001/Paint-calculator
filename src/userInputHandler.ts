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
                const input = await this.askQuestion(`Enter the colour of the paint (${this.validColours.join(', ')}): `).toLowerCase();
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
        const hasObstacles = await this.askQuestion(`Does wall ${wallIndex} have obstacles (yes/no)? `);

        if (hasObstacles.toLowerCase() === 'yes') {
            const numberOfObstacles = parseInt(await this.askQuestion("Enter the number of obstacles: "));
            for (let j = 0; j < numberOfObstacles; j++) {
                let obstacleHeight = parseFloat(await this.askQuestion(`Enter the height of obstacle ${j + 1} (in metres): `));
                let obstacleWidth = parseFloat(await this.askQuestion(`Enter the width of obstacle ${j + 1} (in metres): `));
                obstacles.push({ height: obstacleHeight, width: obstacleWidth });
            }
        }

        return obstacles;
    }

    close(): void {
        this.rl.close();
    }
}
