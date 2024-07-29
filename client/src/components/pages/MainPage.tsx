import { Box, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import useTaskHook from '../../hooks/useTaskHook';
import type { TaskFormType, TaskType } from '../../types/taskTypes';
import EditTaskModal from '../ui/EditTaskModal';
import TaskCard from '../ui/TaskCard';
import TaskForm from '../ui/TaskForm';

export default function MainPage(): JSX.Element {
  const {
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
  } = useTaskHook();

  const handleFormSubmit = async (task: TaskFormType): Promise<void> => {
    try {
      await taskSubmitHandler(task);
    } catch (error) {
      console.error('Error occurred while submitting task:', error);
    }
  };

  const handleSave = async (task: TaskFormType): Promise<void> => {
    if (selectedTask) {
      try {
        await handleTaskUpdate(task);
      } catch (error) {
        console.error('Error occurred while updating task:', error);
      }
    }
  };

  const onFormSubmit = (task: TaskFormType): void => {
    void handleFormSubmit(task); // Преобразуем асинхронную функцию в void
  };

  const onEdit = (id: TaskType['id']): void => {
    void taskEditHandler(id); // Преобразуем асинхронную функцию в void
  };

  const onDelete = (id: TaskType['id']): void => {
    void taskDeleteHandler(id); // Преобразуем асинхронную функцию в void
  };

  const handleSaveWrapper = (task: TaskFormType): void => {
    void handleSave(task); // Обрабатываем промис, не возвращая его
  };

  return (
    <Box padding={4}>
      <Stack spacing={4}>
        <Select
          placeholder="Filter by status"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value as 'completed' | 'incomplete' | 'all')}
        >
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </Select>
        <TaskForm
          onSubmit={onFormSubmit} // Передаем функцию, которая вызывает асинхронную функцию
          selectedTask={selectedTask ?? undefined}
        />
        {tasks.map((task: TaskType) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task.id)} // Передаем функцию, которая вызывает асинхронную функцию
            onDelete={() => onDelete(task.id)} // Передаем функцию, которая вызывает асинхронную функцию
          />
        ))}
      </Stack>
      {isModalOpen && (
        <EditTaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          taskToEdit={selectedTask ?? null} // Обрабатываем null или undefined корректно
          onSave={(task: TaskFormType) => handleSaveWrapper(task)} // Передаем обертку функции
        />
      )}
    </Box>
  );
}
