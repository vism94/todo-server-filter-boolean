import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiResponse, TaskFormType, TaskType } from '../types/taskTypes';
import apiInstance from './apiInstance';

class TaskService {
  constructor(private readonly api: AxiosInstance) {}

  // Обновленный метод getTasks с фильтрацией по статусу
  async getTasks(status?: boolean): Promise<TaskType[]> {
    const query = status !== undefined ? `?done=${status}` : '';
    const { data } = await this.api.get<ApiResponse>(`/tasks${query}`);
    return data;
  }

  async createTask(formData: TaskFormType): Promise<TaskType> {
    const { data } = await this.api.post<TaskType>('/tasks', formData);
    return data;
  }

  async deleteTask(id: TaskType['id']): Promise<AxiosResponse> {
    return this.api.delete(`/tasks/${id}`);
  }

  async getTaskStatus(id: TaskType['id']): Promise<TaskType['done']> {
    const { data } = await this.api.get<TaskType['done']>(`/tasks/${id}`);
    return data;
  }

  async updateTask(id: TaskType['id'], formData: TaskFormType): Promise<TaskType> {
    const { data } = await this.api.patch<TaskType>(`/tasks/${id}`, formData);
    return data;
  }
}

export default new TaskService(apiInstance);
