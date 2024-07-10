import { Wall } from './wall';

export class Room {
    private walls: Wall[];
    private paintCoverage: number;
    private numberOfCoats: number;
    private colour: string;

    constructor(paintCoverage: number, numberOfCoats: number, colour: string) {
        this.walls = [];
        this.paintCoverage = paintCoverage;
        this.numberOfCoats = numberOfCoats;
        this.colour = colour;
    }

    public addWall(height: number, width: number, obstacles: { height: number, width: number }[]): void {
        this.walls.push(new Wall(height, width, obstacles));
    }

    public getTotalArea(): number {
        return this.walls.reduce((total, wall) => total + wall.getArea(), 0) * this.numberOfCoats;
    }

    public getPaintNeeded(): number {
        return this.getTotalArea() / this.paintCoverage;
    }

    public getColour(): string {
        return this.colour;
    }
}
