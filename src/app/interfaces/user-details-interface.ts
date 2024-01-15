export interface UserDetailsInterface {
  id: number;
  user_id: number;
  bodyweight: number;
  height: number;
  allergies: Array<Allergies>;
}
export interface ListAllergies {
  data: Array<Allergies>;
}
export interface Allergies {
  id: number;
  name: string;
}
export interface UserDetailsResponse {
  userDetails: UserDetailsInterface;
  userAllergies: Allergies[];
}
