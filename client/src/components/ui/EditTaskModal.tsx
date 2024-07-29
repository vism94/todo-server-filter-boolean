import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import type { TaskFormType, TaskType } from '../../types/taskTypes';

type EditTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: TaskType | null;
  onSave: (task: TaskFormType) => void;
};

export default function EditTaskModal({ isOpen, onClose, taskToEdit, onSave }: EditTaskModalProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'completed' | 'incomplete'>('incomplete');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.done ? 'completed' : 'incomplete');
    }
  }, [taskToEdit]);

  const handleSave = (): void => {
    if (taskToEdit) {
      const updatedTask: TaskFormType = {
        title,
        description,
        done: status === 'completed',
      };
      onSave(updatedTask);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl id="status">
              <FormLabel>Status</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'completed' | 'incomplete')}
              >
                <option value="incomplete">Incomplete</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
