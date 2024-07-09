export interface User {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
}

export interface Point {
  point: number;
}
