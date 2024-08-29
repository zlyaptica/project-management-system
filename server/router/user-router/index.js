const { Router } = require("express");
const userController = require("../../controllers/user-controller");
const { body } = require("express-validator");

const userRouter = new Router();

userRouter.post(
  "/registration",
  body("email").isEmail(),
  body("nickname").isLength({ min: 4, max: 128 }),
  body("password").isLength({ min: 8, max: 128 }),
  userController.registration
);
userRouter.post("/login", userController.login);
userRouter.post(
  "/logout",
  body("newPassword").isLength({ min: 8, max: 128 }),
  userController.logout
);
userRouter.post("/change_password", userController.changePassword);
userRouter.get("/refresh_token", userController.refreshToken);

module.exports = userRouter;
