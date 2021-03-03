export class Address {
  line1: String;
  line2: String;
  district: String;
  state: String;
  pincode: String;

  constructor(line1, line2, district, state, pincode) {
    this.line1 = line1;
    this.line2 = line2;
    this.district = district;
    this.state = state;
    this.pincode = pincode;
  }
}