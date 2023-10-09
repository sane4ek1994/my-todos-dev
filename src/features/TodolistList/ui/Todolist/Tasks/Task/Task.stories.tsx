import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "features/TodolistList/ui/Todolist/Tasks/Task/Task";
import { ReduxStoreProviderDecorator } from "stories/ReduxStoreProviderDecorator";
import { useSelector } from "react-redux";
import { TAppRootState } from "app/store";
import { todoListID2 } from "features/TodolistList/model/todolists/todolistsSlice";
import { TaskType } from "common/types/types";
import { TaskStatuses, TodoTaskPriorities } from "common/enums/enums";

const meta: Meta<typeof Task> = {
  title: "TODOLIST/Task",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWitchRedux = () => {
  const tasks = useSelector<TAppRootState, TaskType[]>(
    (state) => state.tasks[todoListID2]
  );

  return (
    <>
      {tasks.map((task) => (
        <Task {...task} todolistId={todoListID2} />
      ))}
    </>
  );
};

export const TaskIsDoneStories: Story = {
  args: {
    id: "123",
    title: "TEST TASK COMPONENT",
    todolistId: "124",
    status: TaskStatuses.New,
    description: "",
    todoListId: "",
    order: 0,
    addedDate: "",
    deadline: "",
    startDate: "",
    priority: TodoTaskPriorities.Low,
  },
};
export const TaskStory = {
  render: () => <TaskWitchRedux />,
};
