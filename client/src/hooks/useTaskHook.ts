import { useEffect, useState } from 'react';
import {
  createTaskThunk,
  deleteTaskThunk,
  getTasksThunk,
  updateTaskThunk,
} from '../redux/tasks/taskAsyncThunk';
import type { TaskFormType, TaskType } from '../types/taskTypes';
import { useAppDispatch, useAppSelector } from './reduxHook';

export default function useTaskHook(): {
  tasks: TaskType[];
  selectedTask: TaskType | undefined;
  isModalOpen: boolean;
  filter: 'completed' | 'incomplete' | 'all';
  taskSubmitHandler: (task: TaskFormType) => Promise<void>;
  taskDeleteHandler: (id: TaskType['id']) => Promise<void>;
  taskEditHandler: (id: TaskType['id']) => void;
  handleModalClose: () => void;
  handleTaskUpdate: (task: TaskFormType) => Promise<void>;
  handleModalOpen: () => void;
  handleFilterChange: (filter: 'completed' | 'incomplete' | 'all') => void;
} {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const selectedTask = useAppSelector((state) => state.tasks.selectedTask || undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'completed' | 'incomplete' | 'all'>('all');

  useEffect(() => {
    const status = filter === 'all' ? undefined : filter === 'completed';
    void dispatch(getTasksThunk(status));
  }, [dispatch, filter]);

  // Обёртка для добавления задачи
  const taskSubmitHandler = async (task: TaskFormType): Promise<void> => {
    try {
      await dispatch(createTaskThunk(task));
      await dispatch(getTasksThunk(filter === 'all' ? undefined : filter === 'completed'));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Обёртка для удаления задачи
  const taskDeleteHandler = async (id: TaskType['id']): Promise<void> => {
    try {
      await dispatch(deleteTaskThunk(id));
      await dispatch(getTasksThunk(filter === 'all' ? undefined : filter === 'completed'));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Обёртка для обработки редактирования задачи
  const taskEditHandler = (id: TaskType['id']): void => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      dispatch({ type: 'tasks/setSelectedTask', payload: task });
      setIsModalOpen(true);
    }
  };

  // Закрытие модального окна
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    dispatch({ type: 'tasks/setSelectedTask', payload: undefined });
  };

  // Обёртка для обновления задачи
  const handleTaskUpdate = async (task: TaskFormType): Promise<void> => {
    if (selectedTask) {
      try {
        await dispatch(
          updateTaskThunk({
            id: selectedTask.id,
            formData: task,
          }),
        );
        handleModalClose();
        await dispatch(getTasksThunk(filter === 'all' ? undefined : filter === 'completed'));
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
  };

  // Обёртка для изменения фильтра
  const handleFilterChange = (newFilter: 'completed' | 'incomplete' | 'all'): void => {
    setFilter(newFilter);
    const status = newFilter === 'all' ? undefined : newFilter === 'completed';
    void dispatch(getTasksThunk(status));
  };

  const handleModalOpen = (): void => {
    setIsModalOpen(true);
  };

  return {
    tasks,
    taskSubmitHandler,
    taskDeleteHandler,
    taskEditHandler,
    isModalOpen,
    handleModalClose,
    handleTaskUpdate,
    selectedTask,
    handleFilterChange,
    filter,
    handleModalOpen, // Возвращаем функцию для открытия модального окна
  };
}
