'use client'
import { useBearStore } from '@/store/BoardStore';
import { useState, useEffect } from 'react'




const Board : React.FC = () => {
    const [board,getBoard] = useBearStore((state)=> [state.board,state.getBoard]);
    useEffect(()=>{
        getBoard();
    },[getBoard])

    board.columns.forEach((columnValue, columnName) => {
      console.log(`Column Name: ${columnName}`);
        console.log(columnValue); // This will be the object containing id and todos
    
        // Accessing the todos array within each column
      const todosArray = columnValue.todos;
       todosArray.forEach((todo) => {
            console.log(todo); // Access individual todo items within the todos array
            
       });
    });


    const [tasks, setTasks] = useState<string[]>([]);
    const [InProgressTasks, setInProgressTasks] = useState<string[]>([]);
    const [doneTasks, setDoneTasks] = useState<string[]>([]);
  
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, taskContent: string) => {
        event.dataTransfer.setData('text/plain', taskContent);
      };
    
      const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };
    
      const onDrop = (event: React.DragEvent<HTMLDivElement>, section: string) => {
        event.preventDefault();
        const taskContent = event.dataTransfer.getData('text/plain');
    
        if (section === 'todo') {
          setTasks((prevTasks) => prevTasks.filter((task) => task !== taskContent));
        } else if (section === 'InProgress') {
          setInProgressTasks((prevTasks) => [...prevTasks, taskContent]);
        } else if (section === 'done') {
          setDoneTasks((prevTasks) => [...prevTasks, taskContent]);
        }
      };
      return (
        <div className="flex flex-wrap justify-center">
        {Array.from(board.columns).map(([columnName, columnValue], index, array) => (
          <div key={columnValue.id} className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 ${index < 3 ? 'w-full' : 'flex-grow'}`}>
            <div className="p-5 border rounded-lg bg-gray-100">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">{columnName}</h2>
              {columnValue.todos.map(todo => (
                <div key={todo.$id} className="bg-white rounded-lg p-2 mb-2">
                  <p className="text-gray-700">{todo.title}</p>
                 
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      
      
      


      
      );
    };
    
    export default Board;