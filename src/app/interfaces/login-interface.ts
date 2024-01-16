export interface LoginDetails {
  user: UserInfo;
  token: string;
}
export interface UserInfo {
  id: number;
}
export interface loginResponse {
  id: number;
  token: string;
}
