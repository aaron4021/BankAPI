import { Injectable } from "@nestjs/common";

@Injectable()
export class MathCalculationService {
    getTriangle(a: number, b: number): number {
        return 0.5 * a * b;
    }
}