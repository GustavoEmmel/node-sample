import "reflect-metadata";
import "jasmine";
import { TYPES } from "../src/interfaces/types";
import { Container } from "inversify";
import { ICalculator } from "../src/interfaces/calculator.interface";
import { Calculator } from "../src/calculator";

describe("Calculator", () => {
  const container = new Container();
  container.bind<ICalculator>(TYPES.ICalculator).to(Calculator);

  it("should sum two numbers", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    const result = calculator.sum(3, 4);
    expect(result).toEqual(7);
  });

  it("should subtract two numbers", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    const result = calculator.subtract(3, 4);
    expect(result).toEqual(-1);
  });

  it("should multiply two numbers", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    const result = calculator.multiply(3, 5);
    expect(result).toEqual(15);
  });

  it("should call sum N times", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    const spySum = spyOn(calculator, "sum");
    const spySubtract = spyOn(calculator, "subtract");
    const result = calculator.multiply(3, 5);
    expect(calculator.sum).toHaveBeenCalledTimes(3);
  });

  it("should call sum with correct parameters", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    spyOn(calculator, "sum");
    const result = calculator.multiply(1, 5);
    expect(calculator.sum).toHaveBeenCalledWith(0, 5);
  });

  it("should multiply one numbers by 0", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    const result = calculator.multiply(0, 5);
    expect(result).toEqual(0);
  });

  it("should divide two numbers", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    const result = calculator.divide(10, 2);
    expect(result).toEqual(5);
  });

  it("should throw error if division by zero", () => {
    const calculator = container.get<ICalculator>(TYPES.ICalculator);
    const result = () => {
      calculator.divide(0, 2);
    };
    expect(result).toThrowError("Division by zero is not permitted");
  });

});