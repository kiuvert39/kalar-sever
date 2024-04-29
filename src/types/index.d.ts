export {};

declare global {
  namespace Express {
    interface Request {
      id: string;
      token: string;
      password: string;
      users?: {
        isAdmin: boolean;
        // Add other user properties as needed
      };
    } 
  }
}
