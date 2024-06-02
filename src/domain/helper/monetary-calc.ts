export class MonetaryCalc {
  // Function to convert a monetary value to cents
  public static toCents = (value: number): number => {
    return Math.round(value * 100);
  };

  // Function to convert cents back to dollars
  public static toReais = (cents: number): number => {
    return cents / 100;
  };
}
