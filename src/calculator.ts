import { injectable } from "inversify";
import { ICalculator } from "./interfaces/calculator.interface";

@injectable()
export class Calculator implements ICalculator {
  sum(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    // return a * b;
    let result = 0;
    for(let i = 0; i < a; i++) {
      result = this.sum(result, b);
    }
    return result;
  }

  divide(a: number, b: number): number {
    if(a === 0 || b === 0) {
      throw new Error("Division by zero is not permitted");
    }
    return a / b;
  }
}