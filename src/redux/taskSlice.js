import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const { id, text } = action.payload;

      state.push({
        id: id || Date.now(),
        text,
        completed: false
      });
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    }
  }
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
