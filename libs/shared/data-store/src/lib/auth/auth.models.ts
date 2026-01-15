export interface AuthState {
  token: string | null;
  user: any | null; // User ka naam, email, role etc.
  isAuthenticated: boolean;
}