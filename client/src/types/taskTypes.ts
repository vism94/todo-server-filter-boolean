export type TaskType = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};
export type TaskFormType = Omit<TaskType, 'id'>;

export type ApiResponse = TaskType[];
