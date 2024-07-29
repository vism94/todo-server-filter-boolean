import { createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../../services/taskService';
import type { TaskFormType, TaskType } from '../../types/taskTypes';

// Обновленный getTasksThunk с поддержкой фильтрации по статусу
export const getTasksThunk = createAsyncThunk('tasks/getTasks', async (status?: boolean) => {
  const data = await taskService.getTasks(status);
  return data;
});

export const createTaskThunk = createAsyncThunk('tasks/createTask', async (formData: TaskFormType) => {
  const data = await taskService.createTask(formData);
  return data;
});

export const deleteTaskThunk = createAsyncThunk('tasks/deleteTask', async (id: TaskType['id']) => {
  await taskService.deleteTask(id);
  return id;
});

export const updateTaskThunk = createAsyncThunk<TaskType, { id: TaskType['id'], formData: TaskFormType }>('tasks/updateTask', async ({ id, formData }) => {
  const data = await taskService.updateTask(id, formData);
  return data;
});

export const getTaskStatus = createAsyncThunk('tasks/getTaskStatus', async (id: TaskType['id']) => {
  const data = await taskService.getTaskStatus(id);
  return data;
});
