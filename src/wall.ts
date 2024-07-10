export class Wall {
    private height: number;
    private width: number;
    private obstacles: { height: number, width: number }[];

    constructor(height: number, width: number, obstacles: { height: number, width: number }[] = []) {
        this.height = height;
        this.width = width;
        this.obstacles = obstacles;
    }

    public getArea(): number {
        let obstacleArea = this.obstacles.reduce((total, obstacle) => total + (obstacle.height * obstacle.width), 0);
        return (this.height * this.width) - obstacleArea;
    }
}
