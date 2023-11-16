type TypedColumn = "todo" | "InProgress" | "done";

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;

}
interface Column {
  id: TypedColumn;
  todos: Todo[];
}
interface Board {
  columns: Map<TypedColumn, Column>;
}

type DragProps = {
  draggableProps: React.HTMLAttributes<HTMLDivElement>;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement> | null;
};

type TodoCardProps = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
} & DragProps; 

interface TaskType {
  id: TypedColumn;
  name: string;
  description: string;
  color: string;
}
type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};
