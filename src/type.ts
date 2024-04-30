export interface User {
  id: number;
  name: string;
  email: string;
  address?: string | null;
  birthdate?: Date | null;
  birthplace?: string | null;
  role?: string | null;
  deletedAt?: Date | null;
}
