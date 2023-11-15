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

