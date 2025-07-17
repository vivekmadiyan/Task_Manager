'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask } from '../redux/taskSlice';
import { Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskManager() {
  const [taskInput, setTaskInput] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const handleAdd = () => {
    if (taskInput.trim() !== '') {
      dispatch(addTask({ id: Date.now(), text: taskInput }));
      setTaskInput('');
    }
  };

  const handleRemove = (id) => {
    dispatch(removeTask(id));
  };

  const func = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const json = await res.json();
      json.forEach((item) => {
        dispatch(addTask({ id: item.id, text: item.title }));
      });
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    func();
  }, []);

  // ⚡ Component drops in with bounce effect
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      className="min-h-screen w-full bg-[#121214] flex flex-col items-center"
    >
      {/* Navbar */}
      <div className="bg-black w-full h-50 sm:h-32 flex justify-center items-center">
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
        {/* 🟢 Add button with scale + glow */}
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: '0px 0px 8px rgb(30, 111, 159)',
          }}
          whileTap={{ scale: 0.92 }}
          onClick={handleAdd}
          className="ml-2 px-4 py-2 bg-[#1E6F9F] text-white rounded-md hover:bg-[#155d82] transition"
        >
          Add
        </motion.button>
      </div>

      {/* Task Section */}
      <div className="w-full max-w-md mt-6 flex flex-col gap-2 bg-[#121214] rounded-md px-4 py-3">
        <div className="text-[#4EA8DE] font-semibold">Task Created</div>
        <div className="w-full h-px bg-white opacity-20" />

        <ul className="flex flex-col gap-2 mt-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, x: -40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 150, damping: 14 }}
                className="flex items-center bg-[#262626] px-4 py-2 rounded-md text-white"
              >
                <span className="text-white">{task.text}</span>

                {/* 🔥 Trash icon with hover wiggle and tap scale */}
                <motion.button
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleRemove(task.id)}
                  className="ml-auto text-red-400 hover:text-red-600 transition"
                >
                  <Trash size={20} />
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </motion.div>
  );
}
