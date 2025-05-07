import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Add from '../components/Add';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks, updateTaskStatus } from '../redux/slices/tasksSlice';


const Tasks = () => {
  const dispatch = useDispatch()
  const { taskList, loading } = useSelector((state) => state.tasks)
  const [draggedTaskId, setDraggedTaskId] = useState(null)


  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    console.log('Dispatching status update:', { id: draggedTaskId, status: newStatus });
    if (draggedTaskId)
       {
      dispatch(updateTaskStatus({ id: draggedTaskId, status: newStatus }))
        // .then(() => dispatch(fetchTasks())); // refresh list
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#060608] to-[#928dab] p-4 flex flex-col md:flex-row gap-4">

      {/* LEFT SECTION: Add Task + List of Tasks */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-2/3 bg-white/10 backdrop-blur-2xl border-4 border-white/30 rounded-3xl shadow-2xl p-6 flex flex-col"
      >
        <h1 className="text-white text-2xl font-bold mb-4 text-center">Your ToDo List</h1>

        {/* Add Task Form */}
        <Add />

        {/* Tasks List (Draggable Items) */}
        <div onDrop={(e) => handleDrop(e, "Pending")} onDragOver={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-7">
          {/* Dynamically render your tasks here */}
          {
            loading ? (
              <p className="text-white text-center">Loading tasks...</p>
            ) :
              taskList.length > 0 ? (
                taskList.filter(task => task.status === "Pending").map((task) => (
                  <div onDragStart={(e) => handleDragStart(e, task._id)} key={task._id} className=" min-h-[100px] mt-5 p-4 flex justify-between items-center bg-white/20 rounded-xl text-white cursor-grab active:cursor-grabbing" draggable >
                    <div className="flex flex-col ">
                      <h1 className='font-medium text-white text-2xl'>{task.title}</h1>
                      <p className='font-medium text-white'>Description: {task.description}</p>
                      <p className=' text-gray-300'>Status: {task.status}</p>
                      <p className=' text-gray-300'> Created: {new Date(task.createdAt).toLocaleString()}, Updated: {new Date(task.updatedAt).toLocaleString()}</p>
                    </div>
                    <button onClick={() => dispatch(deleteTask(task._id))} className="text-red-500 text-2xl">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))
              )
                : (
                  <p className="text-white text-center">No tasks found.</p>
                )
          }


        </div>
      </motion.div>

      {/* RIGHT SECTION: Status Columns */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-2/3 flex flex-col gap-4"
      >
        {/* Started */}
        <div onDrop={(e) => handleDrop(e, "Started")} onDragOver={(e) => e.preventDefault()} className="bg-white/10 backdrop-blur-2xl border-4 border-white/30 rounded-3xl shadow-2xl p-4 min-h-[150px] flex flex-col">
          <h2 className="text-white text-xl font-bold mb-2">Started</h2>
          {/* Droppable area */}
          <div className="flex flex-col gap-2">
            {/* Dropped tasks will appear here */}
            {
              taskList.filter(t => t.status === "Started").map(task => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task._id)}
                  className=" min-h-[100px] mt-5 p-4 flex justify-between items-center bg-white/20 rounded-xl text-white cursor-grab active:cursor-grabbing"
                >
                  <div className="flex flex-col">
                    <h1 className='font-medium text-white text-2xl'>{task.title}</h1>
                    <p className='font-medium text-white'>Description: {task.description}</p>
                    <p className=' text-gray-300'>Status: {task.status}</p>
                    <p className=' text-gray-300'> Created: {new Date(task.createdAt).toLocaleString()}, Updated: {new Date(task.updatedAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => dispatch(deleteTask(task._id))} className="text-red-500 text-2xl">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            }
          </div>
        </div>

        {/* Half Completed */}
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, "Half-Completed")} className="bg-white/10 backdrop-blur-2xl border-4 border-white/30 rounded-3xl shadow-2xl p-4 min-h-[150px] flex flex-col">
          <h2 className="text-white text-xl font-bold mb-2">Half Completed</h2>
          <div className="flex flex-col gap-2">
            {taskList.filter(t => t.status === "Half-Completed").map(task => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                className=" min-h-[100px] mt-5 p-4 flex justify-between items-center bg-white/20 rounded-xl text-white cursor-grab active:cursor-grabbing"
              >
                <div className="flex flex-col">
                  <h1 className='font-medium text-white text-2xl'>{task.title}</h1>
                  <p className='font-medium text-white'>Description: {task.description}</p>
                  <p className=' text-gray-300'>Status: {task.status}</p>
                  <p className=' text-gray-300'> Created: {new Date(task.createdAt).toLocaleString()}, Updated: {new Date(task.updatedAt).toLocaleString()}</p>
                </div>
                <button onClick={() => dispatch(deleteTask(task._id))} className="text-red-500 text-2xl">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, "Completed")} className="bg-white/10 backdrop-blur-2xl border-4 border-white/30 rounded-3xl shadow-2xl p-4 min-h-[150px] flex flex-col">
          <h2 className="text-white text-xl font-bold mb-2">Completed</h2>
          <div className="flex flex-col gap-2">
            {taskList.filter(t => t.status === "Completed").map(task => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                className=" min-h-[100px] mt-5 p-4 flex justify-between items-center bg-white/20 rounded-xl text-white cursor-grab active:cursor-grabbing"
              >
                <div className="flex flex-col">
                  <h1 className='font-medium text-white text-2xl'>{task.title}</h1>
                  <p className='font-medium text-white'>Description: {task.description}</p>
                  <p className=' text-gray-300'>Status: {task.status}</p>
                  <p className=' text-gray-300'> Created: {new Date(task.createdAt).toLocaleString()}, Updated: {new Date(task.updatedAt).toLocaleString()}</p>
                </div>
                <button onClick={() => dispatch(deleteTask(task._id))} className="text-red-500 text-2xl">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cancelled */}
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, "Canceled")} className="bg-white/10 backdrop-blur-2xl border-4 border-white/30 rounded-3xl shadow-2xl p-4 min-h-[150px] flex flex-col">
          <h2 className="text-white text-xl font-bold mb-2">Canceled</h2>
          <div className="flex flex-col gap-2">
            {taskList.filter(t => t.status === "Canceled").map(task => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                className=" min-h-[100px] mt-5 p-4 flex justify-between items-center bg-white/20 rounded-xl text-white cursor-grab active:cursor-grabbing"
              >
                <div className="flex flex-col">
                  <h1 className='font-medium text-white text-2xl'>{task.title}</h1>
                  <p className='font-medium text-white'>Description: {task.description}</p>
                  <p className=' text-gray-300'>Status: {task.status}</p>
                  <p className=' text-gray-300'> Created: {new Date(task.createdAt).toLocaleString()}, Updated: {new Date(task.updatedAt).toLocaleString()}</p>
                </div>
                <button onClick={() => dispatch(deleteTask(task._id))} className="text-red-500 text-2xl">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Tasks;
