export interface HashGenerator {
  hash(myPlaintextPassword: string, saltRounds: number): string;
  compare(myPlaintextPassword: string, hash: string): boolean;
}
