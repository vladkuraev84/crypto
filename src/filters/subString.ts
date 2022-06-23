export function subString(amount1: number, amount2: number, str: string) {
  return (
    str.substring(0, amount1) + " ***** " + str.substring(amount2, str.length)
  );
}
