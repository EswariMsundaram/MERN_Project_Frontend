export interface Project{
    name:string;
    description:string;
    _id:string;
}
export interface User {
  _id: string;
  username: string;
  email: string;
  githubId?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status?: "To Do" | "In Progress" | "Done";
  project?: string;
  user?: string;
}