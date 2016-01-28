"use strict";
const crypto = require('../../config/crypto');

module.exports = class Person {
  constructor(body) {
    this.name = body.name;
    this.email = body.email;
    this.address = body.address;
    this.username = body.username;
    this.password = crypto.encrypt(body.password);
    this.role = body.role;
  }

  isValid() {
    return this.name !== undefined && this.email !== undefined
      && this.username !== undefined && this.password !== undefined
      && this.role !== undefined;
  }

  asAList() {
    return [
      this.name, this.email, this.address, this.username, this.password, this.role
    ];
  }
}
