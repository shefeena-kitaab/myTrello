type TypedColumn = "todo" | "InProgress" | "done";

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: string;
}
interface Column {
  id: TypedColumn;
  todos: Todo[];
}
interface Board {
  columns: Map<TypedColumn, Column>;
}

interface Image {
  bucketId: string;
  fileId: string;
}
