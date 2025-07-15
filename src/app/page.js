'use client';

import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask } from '../redux/taskSlice';
import { Trash } from 'lucide-react'; 


export default function TaskManager() {
  const [taskInput, setTaskInput] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

 const handleAdd = () => {
  if (taskInput.trim() !== '') {
    dispatch(addTask({ id: Date.now(), text: taskInput })); 
  }
};


  const handleRemove = (id) => {
    dispatch(removeTask(id));
  };
  

  const func=async()=>{
   try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const json = await res.json();

      json.forEach((item) => {
       dispatch(addTask({ id: item.id, text: item.title }));
      });
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  }
  
   useEffect(()=>{
    func()
  },[])


  return (
    <div className="min-h-screen w-full bg-[#121214] flex flex-col items-center">
      {/* Navbar */}
      <div className="bg-black w-full h-50 sm:h-32  flex justify-center items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 sm:h-10 md:h-8 w-auto object-contain"
        />
      </div>

      {/* Input Section */}
      <div className="w-full flex justify-center -mt-4 px-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-md bg-[#2e2e2e] text-white placeholder:text-gray-400 outline-none"
          placeholder="Enter a task..."
        />
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-2 bg-[#1E6F9F] text-white rounded-md hover:bg-gray-600 transition"
        >
          Add
        </button>
      </div>

      {/* Task Section */}
      <div className="w-full max-w-md mt-6 flex flex-col gap-2 bg-[#121214] rounded-md px-4 py-3">
        <div className="text-[#4EA8DE] font-semibold">Task Created</div>
        <div className="w-full h-px bg-white opacity-20" />

        <ul className="flex flex-col gap-2 mt-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center bg-[#262626] px-4 py-2 rounded-md text-white"
            >
              
              <span className="text-white">{task.text}</span>
              <button
                onClick={() => handleRemove(task.id)}
                className="ml-auto text-red-400 hover:text-red-600 transition"
              >
                <Trash size={20} />
              </button>
            </li>
          ))}
        </ul>
          
      </div>
           

    </div> 
  )
}