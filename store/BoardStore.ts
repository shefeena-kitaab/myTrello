import { create } from "zustand";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { database, storage } from "@/appwrite";

import { ID } from "appwrite";

//useBoardStore is created as a store using Zustand's create function.
export const useBoardStore = create<BoadState>((set, get) => ({
  board: { columns: new Map<TypedColumn, Column>() },

  //fetches the board data from an external source asynchronously and updates the application state.
  getBoard: async () => {
    //structured data of the task management board, organized by columns.
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  //setBoardState directly sets the board state synchronously based on the provided board parameter.
  setBoardState: (board) => set({ board }),

  //update todo status in db
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  //delete task from db
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    //remove the task from stored state
    const newColumns = new Map(get().board.columns);
    //fetches the column corresponding to the given id from the newColumns map.
    // removes one element at the taskIndex position from the todos array of the specified column.
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    //updates the board's state by setting the columns property to the modified newColumns map.
    set({ board: { columns: newColumns } });
    //deletes from db
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  /*  clear the input field immediately when a user interacts with the UI to set a new task input. 
   This ensures that when the user starts typing a new task description, the input field is cleared for a fresh input. */

  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),

  //set new task type
  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

  //after setting the new task states add the task to db
  addTask: async (todo: string, columnId: TypedColumn) => {
    const { $id } = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
      }
    );
    //ensures that after a task is successfully added, the input field is cleared,
    set({ newTaskInput: "" });
    set((state) => {
      //It creates a copy of the existing columns in a newColumns map.
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
      };
      const column = newColumns.get(columnId);

      //If the column doesn't exist in newColumns, it creates a new entry with the columnId and an array containing the new task.
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      }

      //If the column already exists, it adds the new task to the existing column's todos array.
      else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      return {
        board: { columns: newColumns },
      };
    });
  },
}));
