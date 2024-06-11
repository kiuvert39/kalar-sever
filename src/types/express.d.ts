
declare global {
    namespace Express {
      interface Request {
        user?: {
          isAdmin: boolean;
        };
      }
    }
  }