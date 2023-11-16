

import { useBoardStore } from '@/store/BoardStore';






function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: TodoCardProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  return (
    <div className='bg-white rounded-md space-y-2 drop-shadow-md' {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)} className='text-red-500 hover:text-red-600'>
     
          <div >
          <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <line x1="15" y1="9" x2="9" y2="15" />
  <line x1="9" y1="9" x2="15" y2="15" />
</svg>

          </div>
        </button>
      </div>
    </div>
  );
}

export default TodoCard;