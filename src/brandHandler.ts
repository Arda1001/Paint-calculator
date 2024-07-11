import { PaintBrand } from './paintBrand';

export class BrandHandler {
    private brands: PaintBrand[];

    constructor() {
        this.brands = [
            new PaintBrand("Leyland", 1.60, 14, { litre: 1.60, twoPointFive: 4.00, five: 8.00, ten: 16.00 }),
            new PaintBrand("GoodHome", 5.60, 30, { litre: 5.60, twoPointFive: 14.00, five: 28.00, ten: 56.00 }),
            new PaintBrand("Dulux", 2.70, 13, { litre: 2.70, twoPointFive: 6.75, five: 13.50, ten: 27.00 })
        ];
    }

    public getBrands(): PaintBrand[] {
        return this.brands;
    }

}
