export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignupResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  token: string;
}
