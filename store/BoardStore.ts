import { create } from "zustand";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { database, storage } from "@/appwrite";

import {ID } from "appwrite";
interface BoadState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;


  addTask: (todo: string, columnId: TypedColumn) => void;
}
export const useBoardStore = create<BoadState>((set, get) => ({
  board: { columns: new Map<TypedColumn, Column>() },

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
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
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });
   
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },
  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

 

  addTask: async (todo: string, columnId: TypedColumn) => {
    
    
    const {$id} =await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        
      }
    
    );
    set({newTaskInput:""})
    set((state)=> {
      const newColumns = new Map(state.board.columns);
      const newTodo:Todo={
        $id,
        $createdAt: new Date().toISOString(),
        title:todo,
        status: columnId,
        
      };
      const column = newColumns.get(columnId);

      if(!column)
      {
        newColumns.set(columnId,
          {
          id: columnId,
          todos:[newTodo],
          }
        );
      }
      else
      {
        newColumns.get(columnId)?.todos.push(newTodo)
      }
   return{
    board:{ columns:newColumns},
   }
    })
  }
}));
