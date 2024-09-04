import api from "..";

export const authAPI = {
  registration(email: string, nickname: string, password: string) {
    return api.post("/users/registration", { email, nickname, password });
  },
  login(email: string, password: string) {
    return api.post("/users/login", { email, password });
  },
  logout() {
    return api.post("/users/logout");
  },
};

export const userAPI = {
  changePassword(email: string, oldPassword: string, newPassword: string) {
    return api.post("/users/change_password", { email, oldPassword, newPassword });
  },
};

export const projectAPI = {
  getProjects() {
    return api.get("/projects");
  },
  createProject(title: string) {
    return api.post("/projects", { title });
  },
  changeProject(_id: string, title: string) {
    return api.put(`/projects/${_id}`, { title });
  },
  deleteProject(_id: string) {
    return api.delete(`/projects/${_id}`);
  },
};
