const bcrypt = require("bcrypt");
const UserDTO = require("../dtos/user-dto");
const UserModel = require("../models/user-model");
const TokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");
const tokenService = require("./token-service");

class UserService {
  async registration(email, password, nickname) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("Пользователь с таким адресом существует!");
    }

    const saltRounds = parseInt(process.env.SALT, 10);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await UserModel.create({ email, nickname, password: hashPassword });
    const userDTO = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDTO });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Неверный логин или пароль!");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный логин или пароль!");
    }

    const userDTO = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDTO });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDTO = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDTO });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }

  async changePassword(email, oldPassword, newPassword) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Неверно введен логин или существующий пароль!");
    }
    const isPassEquals = await bcrypt.compare(oldPassword, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверно введен логин или существующий пароль!");
    }

    const saltRounds = parseInt(process.env.SALT, 3);
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    await UserModel.updateOne({ email }, { $set: { password: hashPassword } });
    const updatedUser = await UserModel.findOne({ email }); 

    const userDTO = new UserDTO(updatedUser);
    const tokens = TokenService.generateTokens({ ...updatedUser });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }
}

module.exports = new UserService();
