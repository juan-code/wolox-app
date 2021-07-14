export interface Login {
  email: string;
  password: string;
}
export interface ResponseSession {
  token: string
}
export interface User {
  name:      string;
  last_name: string;
  country:   string;
  province:  string;
  mail:      string;
  phone:     string;
  password:  string;
}