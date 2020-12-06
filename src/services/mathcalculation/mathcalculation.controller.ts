import { Body, Controller, Get } from "@nestjs/common";
import { Message } from "../../common/models/message";
import { MathCalculationService } from "./mathcalculation.service";

@Controller("/mathCalculation")
export class MathCalculationController {
    constructor(private readonly mathCalService: MathCalculationService) {}

    @Get("/triangle")
    getTriangle(@Body('a') var1:number, @Body('b') var2:number): Message {
        // return `${this.appService.getTriangle(var1, var2)}`;
        return new Message(`${this.mathCalService.getTriangle(var1, var2)}`);
    }
}