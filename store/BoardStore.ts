import { create } from 'zustand'
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
interface BoadState {
 board: Board;
 getBoard:()=> void;
}
export const useBearStore = create<BoadState>((set) => ({
  board: {columns: new Map< TypedColumn, Column>()},
  
  getBoard:async()=>{
    const board = await getTodosGroupedByColumn();
    set({board});
},
}));