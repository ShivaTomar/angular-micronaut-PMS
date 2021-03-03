import { Address } from './address';

export class Owner {
  id: number;
  fullName: String;
  username: string;
  email: String;
  password: string;
  address: Address;
  
  constructor(id, fullName, username, email, password, address: Address) {
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
  }
}
