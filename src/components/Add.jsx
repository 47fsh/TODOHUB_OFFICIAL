import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/tasksSlice';

const Add = () => {
  const dispatch=useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({ title: "", description: "" });

  // console.log(taskDetails);
  const handleSubmit=()=>{
    if(taskDetails.title&&taskDetails.description)
    {
      dispatch(addTask(taskDetails))
      setTaskDetails({ title: "", description: "" })
      setShowModal(false)
    }
    else
    {
      alert("Please fill the form Completely...")
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
        onClick={() => setShowModal(true)}
      >
        + Add Task
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Task</h2>

            {/* Form Fields */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={taskDetails.title}
                onChange={(e)=>setTaskDetails({...taskDetails,title:e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Task Description"
                rows="1"
                value={taskDetails.description}
                onChange={(e)=>setTaskDetails({...taskDetails,description:e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
                onClick={handleSubmit}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add;
