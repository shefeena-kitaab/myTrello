
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";

const idToColumnText: {
  [key in TypedColumn]: string;
} = { todo: "To Do", InProgress: "In Progress", done: "Done" };

const Column: React.FC<Props> = ({ id, todos, index }) => 
{
  // State and store hooks
  const [setNewTaskType] = useBoardStore((state) => [state.setNewTaskType]);
  const openModal = useModalStore((state) => state.openModal);
  const [sortOnButtonClick, setSortOnButtonClick] = useState(false); // Toggle sorting on button click

  // Sorting logic
  const sortedTodos = sortOnButtonClick
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : todos;

  // Toggle sort button
  const handleSortButtonClick = () => {
    setSortOnButtonClick(!sortOnButtonClick); // Toggle sorting flag
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
                  <button onClick={handleSortButtonClick}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 18L16 16M16 6L20 10.125M16 6L12 10.125M16 6L16 13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 18L12 13.875M8 18L4 13.875M8 18L8 11M8 6V8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>






                  </button>

                  {(sortOnButtonClick ? sortedTodos : todos).map((todo, index) => (
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
                    )
                  )}
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
