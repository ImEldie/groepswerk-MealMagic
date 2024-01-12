export interface LoginDetails {
  user: Array<UserInfo>;
  token: string;
}

export interface UserInfo {
  id: number;
}