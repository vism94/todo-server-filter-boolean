import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import type { TaskType } from '../../types/taskTypes';

type TaskCardProps = {
  task: TaskType;
  onEdit: (id: TaskType['id']) => void;
  onDelete: (id: TaskType['id']) => void;
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps): JSX.Element {
  return (
    <Card maxW="sm" borderWidth={1} borderRadius="lg">
      <CardBody>
        <Stack spacing={3}>
          <Heading size="md">{task.title}</Heading>
          <Text>{task.description}</Text>
          <Text color={task.done ? 'green.600' : 'gray.600'} fontSize="xl">
            {task.done ? 'Completed' : 'Incomplete'}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing={2}>
          <Button onClick={() => onEdit(task.id)} colorScheme="blue">
            Edit
          </Button>
          <Button onClick={() => onDelete(task.id)} colorScheme="red">
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
