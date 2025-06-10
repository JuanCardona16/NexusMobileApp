export interface IUser {
  uuid: string;
  username: string;
  email: string;
  password: string;
  authenticationMethod: AuthMethods;
  rol: UserRole;
  studentCode?: string;
  associatedSubjects?: string[];
  registeredSubjects?: string[];
  historyOfNotifications?: string;
}

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export enum AuthMethods {
  BASIC = 'BASIC',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
}