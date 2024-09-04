module.exports = class UserDTO {
  id;
  email;
  nickname;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.nickname = model.nickname;
  }
};
