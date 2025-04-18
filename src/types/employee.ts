
export interface Employee {
  id?: number;
  fullName: string;
  identityDocument: string;
  birthDate: string; // ISO format: YYYY-MM-DD
  isDeveloper: boolean;
  description: string;
}
