import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL="https://todohub-server.onrender.com"

// get All todo Tasks
export const fetchTasks=createAsyncThunk("tasks/fetchTasks",async ()=>{
    const response=await axios.get(`${SERVER_URL}/getToDo`)
    return response.data
})

// Add Tasks
export const addTask=createAsyncThunk("tasks/addTask",async(taskData)=>{
    const response=await axios.post(`${SERVER_URL}/addToDo`,taskData)
    return response.data
})

// delete task
export const deleteTask=createAsyncThunk("tasks/deleteTask",async(id)=>{
    const response=await axios.delete(`${SERVER_URL}/tasks/${id}/deleteToDo`)
    return response.data
})

// Update task status
export const updateTaskStatus=createAsyncThunk("tasks/updateTaskStatus",async({id,status})=>{
    const response=await axios.put(`${SERVER_URL}/tasks/${id}/updateStatus`,{status})
    return response.data
})


const taskSlice=createSlice({
    name:'tasks',
    initialState:{
        taskList:[],
        loading:false,
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTasks.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchTasks.fulfilled,(state,action)=>{
            state.loading=false
            state.taskList=action.payload
        })
        .addCase(fetchTasks.rejected,(state)=>{
            state.loading=false
        })

        // Add Task
        .addCase(addTask.pending,(state)=>{
            state.loading=true
        })
        .addCase(addTask.fulfilled,(state,action)=>{
            state.loading=false
            state.taskList.push(action.payload)
        })
        .addCase(addTask.rejected,(state)=>{
            state.loading=false
        })

        // delete task
        .addCase(deleteTask.pending,(state)=>{
            state.loading=true
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.loading=false
            state.taskList=state.taskList.filter(task=>task._id!==action.payload._id)
        })
        .addCase(deleteTask.rejected,(state)=>{
            state.loading=false
        })

        // UpdateTaskStatus
        .addCase(updateTaskStatus.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            const index = state.taskList.findIndex(task => task._id === updatedTask._id);
            if (index !== -1) {
              state.taskList[index] = updatedTask;
            }
          });
          
    }
})

export default taskSlice.reducer