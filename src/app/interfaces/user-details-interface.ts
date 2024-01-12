export interface UserDetailsInterface {
  id: number;
  user_id: number;
  bodyweight: number;
  height: number;
  allergy_ids: [];
}
export interface UserDetailWeightHeight {
  bodyweight: number;
  height: number;
}
export interface UserDetailAllergies {
  allergy_ids: [];
}
export interface ListAllergies {
  data: Array<ArrayAllergies>;
}
export interface ArrayAllergies {
  id: number;
  name: string;
}
