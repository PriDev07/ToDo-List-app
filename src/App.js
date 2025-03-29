import { useState } from "react";
import {Check, Trash2, PlusCircle} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

function App(){
  const [tasks, setTasks] = useState([]);
  const [ input, setInput] = useState("");
  const [ desc, setDesc] = useState("");
  const addTask = () => {
    if(input.trim() && desc.trim()){
      setTasks([
        ...tasks,
        {text : input, description : desc, completed: false, date: dayjs().format("DD MM YYYY")}
      ]);
      setInput("");
      setDesc("");
    }
  };
  const toggleTask= (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i)=> i !== index));
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-black p-6">
      <h1 className="text-5xl font-extrabold text-white mb-6 tracking-wide drop-shadow-lg">
        🚀 To-Do List
      </h1>
      <motion.div
      initial = {{opacity: 0 , y : -10}}
      animate = {{opacity: 1, y : 0}}
      transition = {{duration: 0.5}}
      className = "flex flex-col gap-4 mb-6 w-full max-w-lg glass-card p-6 rounded-lg shadow-lg"
      >
        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-box"
        placeholder="Task Title..."
        />
        <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className= "input-box resize-none"
        placeholder="Task Description..."
        />
        <button
        onClick={addTask}
        className="neon-button"
        >
          <PlusCircle size={24}/>
          Add Task
        </button>
      </motion.div>
      {/* task list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <AnimatePresence>
          {tasks.map((task,index)=>(
            <motion.div
            key={index}
            initial={{opacity:0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.9}}
            transition={{duration: 0.3}}
            className="p-5 rounded-xl glass-card transition-all shadow-lg hover:shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h2 className={`text-xl font-bold ${
                  tasks.completed? "line-through text-gray-400" : "text-white"
                }`}>
                  {task.text}
                </h2>
                <input
                type="checkbox"
                checked={task.completed}
                onChange={()=> toggleTask(index)}
                className="w-5 h-5 cursor-pointer"
                ></input>
              </div>
              <p className="text-gray-300 mt-2">{task.description}</p>
              <p className="text-sm text-gray-400 mt-2"> Added on : {task.date}</p>
              <button
              onClick={()=> deleteTask(index)}
              className="mt-3 text-red-400 hover:text-red-500 transition seld-end"
              >
                <Trash2 size={20}/>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default App;