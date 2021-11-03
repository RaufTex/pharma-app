//import api from "./services/api"

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Street {
  name: string;
  number: number;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
}

export interface Dob {
  date: string;
}

export interface Login {
  uuid: string;
}

export interface Picture {
  large: string;
}

export interface Result {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  dob: Dob;
  phone: string;
  cell: string;
  login: Login;
  picture: Picture;
  nat: string;
}

export interface Info {
  results: number;
  page: number;
}

export interface IResults {
  results: Result[];
  filtered: Result[];
  info: Info[];
  getUsers: (params: Result[]) => void;
  getFiltered: (params: Result[]) => void;
  getInfo: (params: Info[]) => void;
  openModal: boolean;
  handleModal: (param: boolean) => void;
}
