const { Router } = require("express");
const authMiddleware = require("../../middlewares/auth-middleware");
const projectController = require("../../controllers/project-controller");
const { body } = require("express-validator");

const projectRouter = new Router();

projectRouter.get("/", authMiddleware, projectController.getProjects);

projectRouter.post(
  "/",
  authMiddleware,
  body("title").isLength({ min: 4, max: 128 }),
  projectController.create
);

projectRouter.put(
  "/:_id",
  authMiddleware,
  body("title").isLength({ min: 4, max: 128 }),
  projectController.changeTitle
);

projectRouter.delete("/:_id", authMiddleware, projectController.deleteProject);

module.exports = projectRouter;
