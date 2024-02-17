export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    isAdmin: boolean;
    isOnVacation: boolean;
    vacationStart: Date;
    vacationEnd: Date;
    joinedAt: Date;
  };
}
