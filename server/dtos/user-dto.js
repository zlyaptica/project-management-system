module.exports = class UserDTO {
  id;
  email;
  password;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.nickname = model.nickname;
    this.password = model.password;
  }
};
