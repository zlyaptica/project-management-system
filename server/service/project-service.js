const ProjectModel = require("../models/project-model");
const UserModel = require("../models/user-model");
const AccessModel = require("../models/access-model");
const ApiError = require("../exceptions/api-error");

class ProjectService {
  async getProjects(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }

    const accessBoards = await AccessModel.find({ user_id: user._id });
    let projects = [];
    for (let i = 0; i < accessBoards.length; i++) {
      const project = await ProjectModel.findOne({ _id: accessBoards[i].project_id });
      projects.push(project);
    }

    return projects;
  }

  async createProject(id, title) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }

    const project = await ProjectModel.create({ title, author: user.id, created_at: Date.now() });
    await AccessModel.create({ user_id: id, project_id: project._id });
    return project;
  }

  async changeTitle(project_id, user_id, title) {
    const user = await UserModel.findById(user_id);
    if (!user) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }

    const project = await ProjectModel.findById(project_id);

    if (!project) {
      throw ApiError.BadRequest("Несуществующий проект!");
    }

    if (!project.author.equals(user_id)) {
      throw ApiError.BadRequest("Вы не можете изменить название чужого проекта!");
    }

    await ProjectModel.updateOne({ _id: project_id }, { $set: { title } });
    const updatedProject = await ProjectModel.findById(project_id)
    return updatedProject;
  }

  async deleteProject(project_id, user_id) {
    const user = await UserModel.findById(user_id);
    if (!user) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }

    const project = await ProjectModel.findById(project_id);

    if (!project) {
      throw ApiError.BadRequest("Несуществующий проект!");
    }

    if (!project.author.equals(user_id)) {
      throw ApiError.BadRequest("Вы не можете изменить название чужого проекта!");
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(project_id);
    await AccessModel.deleteMany({ project_id: project_id });

    return project_id;
  }
}

module.exports = new ProjectService();
