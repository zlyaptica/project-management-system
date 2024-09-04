const { validationResult } = require("express-validator");
const projectService = require("../service/project-service");
const ApiError = require("../exceptions/api-error");

class ProjectController {
  async getProjects(req, res, next) {
    try {
      const { id } = req.user;
      const projects = await projectService.getProjects(id);
      return res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Минимальная длина названия 4 символа, максимальная - 128"})
      }

      const { title } = req.body;
      const { id } = req.user;

      const projectData = await projectService.createProject(id, title);
      return res.status(200).json(projectData);
    } catch (error) {
      next(error);
    }
  }

  async changeTitle(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Минимальная длина названия 4 символа, максимальная - 128"})
      }

      const project_id = req.params._id
      const user_id = req.user.id;

      const { title } = req.body;

      const projectData = await projectService.changeTitle(project_id, user_id, title)

      return res.status(200).json(projectData);
    } catch (error) {
      next(error)
    }
  }

  async deleteProject(req, res, next) {
    try {
      const project_id = req.params._id
      const user_id = req.user.id;

      const projectData = await projectService.deleteProject(project_id, user_id)

      return res.status(200).json(projectData);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProjectController();
