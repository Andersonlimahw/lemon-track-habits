export interface User { 
  id: string, 
  uid: string,
  name: string,
  email: string,
  token: string,
  createdAt?: Date,
  displayName: string;
  photoURL: string;
  password?: string;
}