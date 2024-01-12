export interface UserDetailsInterface {
  id: number;
  user_id: number;
  bodyweight: number;
  height: number;
  allergies: Array<ArrayAllergies>;
}
export interface ListAllergies {
  data: Array<ArrayAllergies>;
}
export interface ArrayAllergies {
  id: number;
  name: string;
}
export interface UserDetailsResponse {
  userDetails: UserDetailsInterface;
  userAllergies: ArrayAllergies[];
}
