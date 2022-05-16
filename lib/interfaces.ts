export interface Todo {
  id: string;
  content: string;
  isDone: boolean;
  authorId: string;
  author: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  todos: Todo[];
}
