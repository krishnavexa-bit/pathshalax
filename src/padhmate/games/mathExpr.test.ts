import { describe, expect, it } from "vitest";
import { compile } from "./mathExpr";

describe("graph playground formulas", () => {
  it("reads powers and implicit multiplication", () => {
    expect(compile("2x^2 - 3x + 1")(2)).toBe(3);
    expect(compile("3(x+1)")(1)).toBe(6);
  });
  it("reads functions and constants", () => {
    expect(compile("sin(pi/2)")(0)).toBeCloseTo(1);
    expect(compile("sqrt(x)")(9)).toBe(3);
  });
  it("rejects unknown names instead of running them", () => {
    expect(() => compile("alert(1)")).toThrow();
  });
});
