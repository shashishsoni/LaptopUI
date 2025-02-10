export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignupResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}
