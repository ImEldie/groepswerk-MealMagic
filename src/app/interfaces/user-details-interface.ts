export interface UserDetailsInterface {
  id: number;
  user_id: number;
  bodyweight: number;
  height: number;
  allergies: Array<Allergy>;
}
export interface Allergy {
  id: number;
  name: string;
}
export interface UserDetailsResponse {
  userDetails: UserDetailsInterface;
  userAllergies: Allergy[];
}
