import { PropsWithChildren } from "react";
import { Todo } from "./interfaces";

export type PropsWithChildrenOnly = PropsWithChildren<unknown>;
export type ReactFCWithChildren = React.FC<PropsWithChildrenOnly>;

export type Todos = {
  todos: Todo[];
};
