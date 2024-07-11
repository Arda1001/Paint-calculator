import { Wall } from './wall';

export class Room {
    private walls: Wall[];
    private paintCoverage: number = 0;
    private numberOfCoats: number;
    private colour: string;

    constructor(numberOfCoats: number, colour: string) {
        this.walls = [];
        this.numberOfCoats = numberOfCoats;
        this.colour = colour;
    }

    public setPaintCoverage(coverage: number): void {
        this.paintCoverage = coverage;
    }

    public addWall(height: number, width: number, obstacles: { height: number, width: number }[]): void {
        this.walls.push(new Wall(height, width, obstacles));
    }

    // Calculate the total area of all walls in the room
    public getTotalArea(): number {
        return this.walls.reduce((total, wall) => total + wall.getArea(), 0) * this.numberOfCoats;
    }

    public getPaintNeeded(): number {
        return this.paintCoverage > 0 ? this.getTotalArea() / this.paintCoverage : 0;
    }

    public getColour(): string {
        return this.colour;
    }
}

