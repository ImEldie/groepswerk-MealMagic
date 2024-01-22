export interface UserDetailApiResponse {
  id: number;
  user_id: number;
  bodyweight: number;
  height: number;
  allergies: Array<Allergy>;
}

export interface UserDetailsInterface {
  id: number;
  user_id: number;
  bodyweight: number;
  height: number;
  allergies: Array<Allergy>;
}
export interface AllergyList {
  data: Array<Allergy>;
}
export interface Allergy {
  id: number;
  name: string;
}
export interface UserDetailsResponse {
  userDetails: UserDetailsInterface;
  userAllergies: Allergy[];
}
export interface ReviewsResponse {
  data: Array<Review>;
}
export interface Review {
  id: number;
  dish_id: number;
  user_id: number;
  stars: number;
}
