const ProjectModel = require("../models/project-model");
const UserModel = require("../models/user-model");
const ApiError = require("../exceptions/api-error");
const { default: mongoose } = require("mongoose");


class ProjectService {
  async getProjects(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }

    const projects = await ProjectModel.find({ author: id });

    return projects;
  }
  async createProject(id, title) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }

    const project = await ProjectModel.create({ title, author: user.id, created_at: Date.now() });

    return project;
  }

  async changeTitle(project_id, user_id, title) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }

    const project = await ProjectModel.findById(project_id);

    if (!project) {
      throw ApiError.BadRequest("Несуществующий пользователь!");
    }
    
    if (user._id !== project.author) {
      throw ApiError.BadRequest("Вы не можете изменить название чужого проекта!");
    }

    const updatedProject = await ProjectModel.updateOne({ _id: project_id }, { $set: { title } });
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
    console.log("first", user_id)
    console.log("sec", project.author)
    if (!project.author.equals(user_id)) {
      throw ApiError.BadRequest("Вы не можете изменить название чужого проекта!");
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(project_id)

    return project_id
  }
}

module.exports = new ProjectService();
