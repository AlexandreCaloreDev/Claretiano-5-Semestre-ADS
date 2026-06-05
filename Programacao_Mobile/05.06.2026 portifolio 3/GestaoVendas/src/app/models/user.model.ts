export interface User {
  id: string;
  username: string;
  password?: string; // Optional for security when passing around
  email: string;
}
