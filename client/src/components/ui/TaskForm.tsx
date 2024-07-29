import { Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import type { TaskFormType } from '../../types/taskTypes';

type TaskFormProps = {
  onSubmit: (task: TaskFormType) => void;
  selectedTask?: TaskFormType;
};

export default function TaskForm({ onSubmit, selectedTask }: TaskFormProps): JSX.Element {
  const [title, setTitle] = useState(selectedTask?.title || '');
  const [description, setDescription] = useState(selectedTask?.description || '');
  const [status, setStatus] = useState<'completed' | 'incomplete'>(
    selectedTask?.done ? 'completed' : 'incomplete',
  );

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setStatus(selectedTask.done ? 'completed' : 'incomplete');
    }
  }, [selectedTask]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value } = event.target;
    if (id === 'title') {
      setTitle(value);
    } else if (id === 'description') {
      setDescription(value);
    } else if (id === 'status') {
      setStatus(value as 'completed' | 'incomplete');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      done: status === 'completed',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input id="title" value={title} onChange={handleChange} placeholder="Enter task title" />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            id="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter task description"
          />
        </FormControl>
        <FormControl id="status" isRequired>
          <FormLabel>Status</FormLabel>
          <Select id="status" value={status} onChange={handleChange}>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Save
        </Button>
      </Stack>
    </form>
  );
}
