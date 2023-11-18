"use client";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import React, { useState, useEffect } from "react";
const idToColumnText: {
  [key in TypedColumn]: string;
} = { todo: "To Do", InProgress: "In Progress", done: "Done" };

const Column: React.FC<Props> = ({ id, todos, index }) => {
  // State and store hooks
  const [setNewTaskType] = useBoardStore((state) => [state.setNewTaskType]);
  const openModal = useModalStore((state) => state.openModal);
  const [sortOnButtonClick, setSortOnButtonClick] = useState(false);

  const sortBoard = useBoardStore((state) => state.sortBoard);

  useEffect(() => {
    if (sortOnButtonClick) {
      sortBoard();
    }
  }, [sortOnButtonClick, sortBoard]);

  const handleSortButtonClick = () => {
    setSortOnButtonClick(!sortOnButtonClick);
  };

  // Handle adding a new todo
  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                    {todos.length}
                  </span>
                </h2>
                <div className="space-y-2">
                  <button onClick={handleSortButtonClick}  className="rounded-full bg-gray-500 bg-opacity-30 p-2 focus:outline-none">
                  <svg fill="#000000" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 301.219 301.219" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M159.365,23.736v-10c0-5.523-4.477-10-10-10H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h139.365 C154.888,33.736,159.365,29.259,159.365,23.736z"></path> <path d="M130.586,66.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h120.586c5.523,0,10-4.477,10-10v-10 C140.586,71.213,136.109,66.736,130.586,66.736z"></path> <path d="M111.805,129.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h101.805c5.523,0,10-4.477,10-10v-10 C121.805,134.213,117.328,129.736,111.805,129.736z"></path> <path d="M93.025,199.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h83.025c5.522,0,10-4.477,10-10v-10 C103.025,204.213,98.548,199.736,93.025,199.736z"></path> <path d="M74.244,262.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h64.244c5.522,0,10-4.477,10-10v-10 C84.244,267.213,79.767,262.736,74.244,262.736z"></path> <path d="M298.29,216.877l-7.071-7.071c-1.875-1.875-4.419-2.929-7.071-2.929c-2.652,0-5.196,1.054-7.072,2.929l-34.393,34.393 V18.736c0-5.523-4.477-10-10-10h-10c-5.523,0-10,4.477-10,10v225.462l-34.393-34.393c-1.876-1.875-4.419-2.929-7.071-2.929 c-2.652,0-5.196,1.054-7.071,2.929l-7.072,7.071c-3.904,3.905-3.904,10.237,0,14.142l63.536,63.536 c1.953,1.953,4.512,2.929,7.071,2.929c2.559,0,5.119-0.976,7.071-2.929l63.536-63.536 C302.195,227.113,302.195,220.781,298.29,216.877z"></path> </g> </g></svg>
                  </button>

                  {todos?.map((todo: Todo, index: number) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={`${todo.$id}_${id}`}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button
                      onClick={handleAddTodo}
                      className="text-green-500 hover:text-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 010-2h4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
