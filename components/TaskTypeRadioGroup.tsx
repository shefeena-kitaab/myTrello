import React, { useState, useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";


const types: TaskType[] = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "InProgress",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];

function TaskTypeRadioGroup() {
  const defaultTaskType = useBoardStore((state) => state.newTaskType);
  const [newTaskType, setNewTaskType] = useState<TypedColumn>(defaultTaskType || "todo");
  const boardStoreSetNewTaskType = useBoardStore((state) => state.setNewTaskType);

  useEffect(() => {
    boardStoreSetNewTaskType(newTaskType);
  }, [newTaskType, boardStoreSetNewTaskType]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value as TypedColumn;
    setNewTaskType(selectedType);
    boardStoreSetNewTaskType(selectedType);
  };

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <div className="space-y-2">
          {types.map((type) => (
            <label
              key={type.id}
              className={`relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none ${
                newTaskType === type.id ? `${type.color} bg-opacity-75 text-white` : "bg-white"
              }`}
            >
              <input
                type="radio"
                name="taskType"
                value={type.id}
                checked={newTaskType === type.id}
                onChange={handleTypeChange}
                className="hidden"
              />
              <div className="flex items-center w-full">
                <div className="flex flex-col w-full">
                  <p className={`font-medium ${newTaskType === type.id ? "text-white" : "text-gray-900"}`}>
                    {type.name}
                  </p>
                  <span className={`text-sm ${newTaskType === type.id ? "text-white" : "text-gray-500"}`}>
                    {type.description}
                  </span>
                </div>
                {newTaskType === type.id && (
                  <div className="shrink-0 text-white">
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 13l4 4L19 7"
  />
</svg>
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskTypeRadioGroup;
