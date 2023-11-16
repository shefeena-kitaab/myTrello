'use client'
import { FormEvent } from 'react';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import { useBoardStore } from '@/store/BoardStore';
import { useModalStore } from '@/store/ModalStore';
import { XCircleIcon } from '@heroicons/react/20/solid';

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
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
          <div className="flex items-center justify-center min-h-full">
            <div className="w-full max-w-md transform transition-all rounded-2xl bg-white p-6">
            <div className="flex justify-end">
  {/* Close button */}
  <button
    onClick={() => closeModal()} 
    className="flex items-center justify-center bg-gray-200 rounded-full w-8 h-8 text-gray-500 hover:text-gray-700 focus:outline-none"
  >
<XCircleIcon className="text-gray-400 h-8 w-8 " />
  </button>
</div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 pb-2">Add a Task</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    value={newTaskInput}
                    className="w-full p-5 outline-none border border-gray-300 rounded-md"
                  />
                </div>
                <TaskTypeRadioGroup />
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 
                    text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;