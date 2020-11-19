export type User = {
  aud?: string;
  exp?: number;
  iat?: number;
  id: number;
  iss?: string;
  name: string;
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
};
