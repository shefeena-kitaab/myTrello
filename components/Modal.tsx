"use client";
import { FormEvent, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

import { PhotoIcon } from "@heroicons/react/20/solid";

function Modal() {


  const [addTask, newTaskInput, setNewTaskInput, newTaskType] = useBoardStore((state) => [
    state.addTask,

    state.newTaskInput,
    state.setNewTaskInput,
    state.newTaskType
   
  ]);
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const handleSubmit =(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(!newTaskInput) return;

    addTask(newTaskInput,newTaskType)

    closeModal();
  }
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
      as="form" 
      onSubmit={handleSubmit}
      onClose={closeModal} 
      className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className=" fixed inset-0 overflow-y-auto">
          <div className=" flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className=" w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Task
                </Dialog.Title>
                <div>
                  <input
                    type="text"
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    value={newTaskInput}
                    className="w-full p-5 outline-none border border-gray-300 rounded-md"
                  />
                </div>
              <TaskTypeRadioGroup/>
            
             
                <div className="mt-4">
                    <button 
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 
                    text-sm font-medium text-blue-900 hover:bg-blue-200 focys:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                     focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                        Add Task
                    </button>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default Modal;
