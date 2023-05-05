export interface hashGenerator {
  hash(myPlaintextPassword: string, saltRounds: number): string;
  compare(myPlaintextPassword: string, hash: string): boolean;
}
