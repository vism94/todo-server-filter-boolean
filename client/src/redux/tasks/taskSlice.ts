import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { TaskType } from "../../types/taskTypes";
import { getTasksThunk, createTaskThunk, deleteTaskThunk, updateTaskThunk, getTaskStatus } from "./taskAsyncThunk";

// Типизация начального состояния
type InitialStateType = {
  tasks: TaskType[];
  selectedTask: TaskType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Статус загрузки данных
};

// Начальное состояние
const initialState: InitialStateType = {
  tasks: [],
  selectedTask: null,
  status: 'idle',
};

// Создание слайса
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask(state, action: PayloadAction<TaskType | null>) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Загрузка задач
    builder.addCase(getTasksThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getTasksThunk.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getTasksThunk.rejected, (state) => {
      state.status = 'failed';
    });

    // Создание задачи
    builder.addCase(createTaskThunk.fulfilled, (state, action: PayloadAction<TaskType>) => {
      state.tasks = [...state.tasks, action.payload];
    });
    
    // Удаление задачи
    builder.addCase(deleteTaskThunk.fulfilled, (state, action: PayloadAction<TaskType['id']>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
    
    // Обновление задачи
    builder.addCase(updateTaskThunk.fulfilled, (state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    });
    
    // Получение статуса задачи
    builder.addCase(getTaskStatus.fulfilled, (state, action: PayloadAction<{ id: TaskType['id'], done: boolean }>) => {
      const { id, done } = action.payload;
      if (state.selectedTask && state.selectedTask.id === id) {
        // Обновляем статус выбранной задачи, если она была выбрана
        state.selectedTask.done = done;
      } else {
        // Если задача не выбрана, возможно, вы захотите обновить ее в списке задач
        state.tasks = state.tasks.map((task) =>
          task.id === id ? { ...task, done } : task
        );
      }
    });
  },
});

export const { setSelectedTask } = taskSlice.actions;

export default taskSlice.reducer;
