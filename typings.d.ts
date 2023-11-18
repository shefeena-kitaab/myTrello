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
interface ModelState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
interface BoadState {
  board: Board;
  sboard: Board;

  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;
  addTask: (todo: string, columnId: TypedColumn) => void;
  sortBoard: ()=> void;
}