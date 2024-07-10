import { PaintCalculator } from "./paintCalculator";

async function main() {
    const paintCalculator = new PaintCalculator();
    await paintCalculator.run();
}

main();